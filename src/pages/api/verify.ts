import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  success: boolean;
  message: string;
};

// Mock database to store OTPs (this should match the one in storeOtp.ts)
const otpStore: { [email: string]: { otp: string; expiry: number } } = {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email, verificationCode } = req.body;

    if (!email || !verificationCode) {
      return res.status(400).json({ success: false, message: 'Email and verification code are required' });
    }

    const storedData = otpStore[email];

    if (!storedData) {
      return res.status(400).json({ success: false, message: 'No OTP found for this email' });
    }

    if (Date.now() > storedData.expiry) {
      delete otpStore[email];
      return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    if (storedData.otp !== verificationCode) {
      return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    // OTP is valid, remove it from storage
    delete otpStore[email];

    return res.status(200).json({ success: true, message: 'OTP verified successfully' });
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
