import type { NextApiRequest, NextApiResponse } from 'next';
const simulatedLocalStorage: { [key: string]: string } = {};

type Data = {
  success: boolean;
  message: string;
  otp?: string;
};

// Mock database to store OTPs (replace with actual database in production)
const otpStore: { [email: string]: { otp: string; expiry: number } } = {};

function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function storeOTP(email: string, otp: string) {
  const expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
  simulatedLocalStorage[email] = JSON.stringify({ otp, expiry });
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === 'POST') {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    const newOTP = generateOTP();
    storeOTP(email, newOTP);

    // In a real application, you would send this OTP via email
    // For demonstration, we're just returning it in the response
    return res.status(200).json({ 
      success: true, 
      message: 'OTP generated and stored successfully',
      otp: newOTP 
    });
  } else {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }
}
