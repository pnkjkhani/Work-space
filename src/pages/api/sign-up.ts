import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../utils/db';
import User, { IUser } from '../schemas/user.schema';
import nodemailer from 'nodemailer';

type Data = {
  message: string;
};

export type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
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

      // Connect to the database
      await connectToDatabase();

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already registered' });
      }

      // Generate OTP
      const otp = generateOTP();
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Create new user
      const newUser: IUser = new User({
        email,
        firstName,
        lastName,
        otp,
        otpExpires,
      });

      // Save user to database
      await newUser.save();

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

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

async function sendOTPEmail(email: string, otp: string): Promise<void> {
  const transporter = nodemailer.createTransport({
    // Configure your email service here
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Your OTP for Registration',
    text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    html: `<p>Your OTP is: <strong>${otp}</strong></p><p>It will expire in 10 minutes.</p>`,
  };

  await transporter.sendMail(mailOptions);
}
