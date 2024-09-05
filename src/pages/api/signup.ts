import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../utils/db';
import User, { IUser } from '../schemas/user.schema';
import { sendOTPEmail } from '../helper/sendOTP';
import { generateOTP } from '../helper/generateOTP';
import { isValidEmail } from '../helper/isValidEmail';
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
      //database connection
      await connectToDatabase();
      const { firstName, lastName, email } = req.body as UserInput;

      // Basic validation
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      // Check if the user already exists
      const existingUser = await User.findOne({ email });

      if (existingUser) {
        if (existingUser.isVerified) {
          return res.status(400).json({ message: 'Email already registered and verified' });
        } else {
          // User exists but not verified, generate new OTP
          const newOtp = generateOTP();
          const newOtpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

          // Update user with new OTP and expiration
          existingUser.otp = newOtp;
          existingUser.otpExpires = newOtpExpires;
          await existingUser.save();

          // Send new OTP via email
          await sendOTPEmail(email, newOtp);

          return res.status(200).json({ message: 'New OTP sent. Please check your email for verification.' });
        }
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
      //Todo: send email
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






