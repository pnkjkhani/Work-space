import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import type { NextApiRequest, NextApiResponse } from 'next';
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
      // Find the user by email
      const user = await prisma.user.findFirst({
        where: { email: email },
      });

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

        // Update user with new OTP and expiry
        await prisma.user.updateMany({
          where: { email: user.email }, // Use the unique identifier 'id' instead of 'email'
          data: { otp: newOTP, otpExpires }
        });

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
      await prisma.user.update({
        where: { id: user.id }, // Add user.email or the correct field that uniquely identifies the user
        data: { otp: '', otpExpires: new Date(), isVerified: true }
      });

      return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
      console.error('Error during OTP verification:', error);
      return res.status(500).json({ success: false, message: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
