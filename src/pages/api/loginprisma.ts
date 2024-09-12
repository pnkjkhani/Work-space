import type { NextApiRequest, NextApiResponse } from 'next';
import { isValidEmail } from '../helper/isValidEmail';
import { sendOTPEmail } from '../helper/sendOTP';
import { generateOTP } from '../helper/generateOTP';
import { PrismaClient } from '@prisma/client';

// Create an instance of PrismaClient
const prisma = new PrismaClient();

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

      // Connect to the database using Prisma
      await prisma.$connect();

      // Find the user by email using Prisma
      const user = await prisma.user.findFirst({ where: { email } });

      if (!user) {
        return res.status(400).json({ success: false, message: 'No user found with this email' });
      }

      // Generate new OTP
      const newOtp = generateOTP();
      const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Update user with new OTP and expiration using Prisma
      await prisma.user.updateMany({
        where: { email },
        data: { otp: newOtp, otpExpires: newOtpExpires }
      });

      // Send new OTP via email
      const isEmailSent = await sendOTPEmail(email, newOtp);

      if (isEmailSent) {
        return res.status(200).json({
          success: true,
          message: 'OTP sent to your email for verification.',
          redirectTo: '/verifyprisma'
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
