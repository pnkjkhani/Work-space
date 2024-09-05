import type { NextApiRequest, NextApiResponse } from 'next';
import { connectToDatabase } from '../utils/db';
import User, { IUser } from '../schemas/user.schema';
import { sendOTPEmail } from '../helper/sendOTP';
import { generateOTP } from '../helper/generateOTP';

export type SignUpResponse = {
  message: string;
};

export type UserInput = {
  firstName: string;
  lastName: string;
  email: string;
};

let isConnected = false;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SignUpResponse>
) {
  if (req.method === 'POST') {
    try {
      // Ensure database connection
      if (!isConnected) {
        await connectToDatabase();
        isConnected = true;
      }

      const { firstName, lastName, email } = req.body as UserInput;

      // Basic validation
      if (!firstName || !lastName || !email) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      console.log(email);
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
      }
      console.log("is valid email", isValidEmail(email));
      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      console.log(existingUser,"existingUser");

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
          await sendOTPEmail(email, newOtp);//Todo later

          return res.status(200).json({ message: 'New OTP sent. Please check your email for verification.' });
        }
      }

      // Generate OTP
      const otp = generateOTP();
      console.log(otp,"otp");
      const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

      // Create new user
      const newUser: IUser = new User({
        email,
        firstName,
        lastName,
        otp,
        otpExpires,
      });
      console.log(newUser,"newUser");
      // Save user to database
      const newSavedUser=await newUser.save();
      console.log(newSavedUser,"newSavedUser");
      // Send OTP via email
      console.log("otp sending...");
      const isEmailSent=await sendOTPEmail(email, otp);
      console.log(isEmailSent,"isEmailSent");
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

export function isValidEmail(email: string): boolean {
  // RFC 5322 compliant regex
  const emailRegex = /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;

  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  const [localPart, domain] = email.split('@');

  // Check local part and domain length
  if (localPart.length > 64 || domain.length > 255) {
    return false;
  }

  // Check if domain has at least one dot
  if (!domain.includes('.')) {
    return false;
  }

  return true;
}




