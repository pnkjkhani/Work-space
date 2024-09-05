import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../utils/db';
import User from '../schemas/user.schema';
import { generateOTP } from '../helper/generateOTP';
import { sendOTPEmail } from '../helper/sendOTP';

export type verifyResponse = {
  success: boolean;
  message: string;
  
};

export type VerifyRequestBody = {
  email: string;
  verificationCode: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<verifyResponse>
) {
  if (req.method === 'POST') {
    const { email, verificationCode } = req.body as VerifyRequestBody;

    if (!email || !verificationCode) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required' });
    }

    try {
      // Connect to the database
      await connectToDatabase();
      
      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success: false, message: 'No user found with this email' });
      }

      if (!user.otp || !user.otpExpires) {
        return res.status(400).json({ success: false, message: 'No OTP found for this user' });
      }

      // Check if OTP has expired
      if (new Date() > user.otpExpires) {
        // Generate new OTP
        const newOTP = generateOTP();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        // Save new OTP to database
        user.otp = newOTP;
        user.otpExpires = otpExpires;
        await user.save();

        // Send new OTP via email
        const emailSent = await sendOTPEmail(email, newOTP);

        if (emailSent) {
          return res.status(400).json({ success: false, message: 'OTP has expired. A new OTP has been sent to your email.' });
        } else {
          return res.status(500).json({ success: false, message: 'Failed to send new OTP. Please try again later.' });
        }
      }

      // Check if OTP matches
      if (user.otp !== verificationCode) {
        return res.status(400).json({ success: false, message: 'Invalid OTP' });
      }

      // OTP is valid, update user document
      user.otp = '';
      user.otpExpires = new Date();
      user.isVerified = true;  // Set isVerified to true
      await user.save();

      return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
