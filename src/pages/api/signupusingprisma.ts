import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { sendOTPEmail } from '../helper/sendOTP';
import { generateOTP } from '../helper/generateOTP';
import { isValidEmail } from '../helper/isValidEmail';

const prisma = new PrismaClient();

export type SignUpResponse = {
  message: string;
};

export type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>
) {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email } = req.body as UserInput;

      // Basic validation
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }

      // Check if the user already exists
      const existingUser = await prisma.user.findFirst({
        where: { email: email },
      });
      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({ message: 'Email already registered and verified' });
        } else {
          // User exists but not verified, generate new OTP
          const newOtp = generateOTP();
          const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

          // Update user with new OTP and expiration
          await prisma.user.updateMany({
            where: { email },
            data: { otp: newOtp, otpExpires: newOtpExpires },
          });

          // Send new OTP via email
          await sendOTPEmail(email, newOtp);

          return res.status(200).json({ message: 'New OTP sent. Please check your email for verification.' });
        }
      }

      // Generate OTP
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Create new user
      await prisma.user.create({
        data: {
          email,
          firstName,
          lastName,
          isVerified: false, 
          otp: generateOTP(),
          otpExpires: new Date(Date.now() + 10 * 60 * 1000),
        },
      });

      // Send OTP via email
      await sendOTPEmail(email, otp);

      res.status(200).json({ message: 'User registered successfully. Please check your email for the OTP.' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}






