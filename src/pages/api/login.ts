import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../utils/db';
import User from '../schemas/user.schema';
import { isValidEmail } from '../helper/isValidEmail';
import { sendOTPEmail } from '../helper/sendOTP';
import { generateOTP } from '../helper/generateOTP';

export type LoginRequestBody = {
  email: string;
};

export type LoginResponse = {
  success: boolean;
  message: string;
  redirectTo?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponse>
) {
  if (req.method === 'POST') {
    try {
      const { email } = req.body as LoginRequestBody;

      if (!email || !isValidEmail(email)) {
        return res.status(400).json({ success: false, message: 'Valid email is required' });
      }

      // Connect to the database
      await connectToDatabase();

      // Find the user by email
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ success: false, message: 'No user found with this email' });
      }

      // Generate new OTP
      const newOtp = generateOTP();
      const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Update user with new OTP and expiration
      user.otp = newOtp;
      user.otpExpires = newOtpExpires;
      await user.save();

      // Send new OTP via email
      const isEmailSent = await sendOTPEmail(email, newOtp);

      if (isEmailSent) {
        return res.status(200).json({
          success: true,
          message: 'OTP sent to your email for verification.',
          redirectTo: '/verify'
        });
      } else {
        return res.status(500).json({ success: false, message: 'Failed to send OTP. Please try again.' });
      }

    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} Not Allowed` });
  }
}
