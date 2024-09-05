import nodemailer from 'nodemailer';
import { createTransport } from 'nodemailer';
import { SES } from 'aws-sdk';
export async function sendOTPEmail(email: string, otp: string): Promise<boolean> {
  try {
    // Create a transporter using AWS SES
    const transporter = nodemailer.createTransport({
      // Configure your email service here
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT || '587'),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // HTML template for the email
    console.log(transporter,"transporter");

    const htmlTemplate = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Your OTP for Registration</title>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .otp { font-size: 24px; font-weight: bold; color: #007bff; }
        </style>
      </head>
      <body>
        <div class="container">
          <h2>Your One-Time Password (OTP)</h2>
          <p>Your OTP for registration is: <span class="otp">${otp}</span></p>
          <p>This OTP will expire in 10 minutes.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Your OTP for Registration',
      html: htmlTemplate,
      text: `Your OTP is: ${otp}. It will expire in 10 minutes.`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.messageId);
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}