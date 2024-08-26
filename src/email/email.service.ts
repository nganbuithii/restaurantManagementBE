// email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT) || 587,  
      secure: false,
      auth: {
        user: process.env.EMAIL_AUTH_USER,
        pass: process.env.EMAIL_AUTH_PASS,
      },
    });
  }

  async sendOTP(to: string, otp: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Nabity Restaurant" <noreply@nabity.com>',
      to: to,
      subject: 'Password Reset OTP - Nabity Restaurant ',
      // text: `Your OTP for password reset is: ${otp}. It will expire in 3 minutes.`,
      html: `<html><p>Your OTP for password reset is : <strong>${otp}</strong>. It will expire in 3 minutes.</p></html>`,
    });
  }
}