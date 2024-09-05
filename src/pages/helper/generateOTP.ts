export function generateOTP(length: number = 6): string {
    const digits = '0123456789';
    const crypto = require('crypto');
    let OTP = '';
  
    for (let i = 0; i < length; i++) {
      OTP += digits[crypto.randomInt(0, digits.length)];
    }
  
    return OTP;
  }