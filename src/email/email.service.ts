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



  async sendReservationConfirmation(to: string, reservationDetails: any): Promise<void> {
    const { date, time, tableId, status } = reservationDetails;

    await this.transporter.sendMail({
      from: '"Nabity Restaurant" <noreply@nabity.com>',
      to: to,
      subject: 'Reservation Confirmation - Nabity Restaurant',
      html: `
        <html>
          <p>Dear Guest,</p>
          <p>Your reservation has been confirmed!</p>
          <p><strong>Date:</strong> ${date}</p>
          <p><strong>Time:</strong> ${time}</p>
          <p><strong>Table ID:</strong> ${tableId}</p>
          <p><strong>Status:</strong> ${status}</p>
          <p>Thank you for choosing Nabity Restaurant. We look forward to serving you.</p>
          <p>Best Regards,</p>
          <p>Nabity Restaurant Team</p>
        </html>
      `,
    });
  }

  async sendEmail(to: string, subject: string, content: string): Promise<void> {
    await this.transporter.sendMail({
      from: '"Nabity Restaurant" <noreply@nabity.com>',
      to: 'ngantailieu2311@gmail.com,',
      subject: subject,
      html: content,
    });
  }
}