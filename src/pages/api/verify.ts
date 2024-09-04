import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../utils/db';
import User from '../schemas/user.schema';

type Data = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required' });
    }

    try {
      // Connect to the database
      const db = await connectToDatabase();
      
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
        // Clear the OTP and expiration
        user.otp ='';
        user.otpExpires = new Date();
        await user.save();
        return res.status(400).json({ success: false, message: 'OTP has expired' });
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
