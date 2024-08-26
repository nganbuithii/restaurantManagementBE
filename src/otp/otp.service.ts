import { Injectable } from '@nestjs/common';

@Injectable()
export class OtpService {

    private otpStore: Map<string, { otp: string; expiry: Date }> = new Map();

    generateOTP(): string {
        return Math.floor(100000 + Math.random() * 900000).toString();
    }

    storeOTP(email: string, otp: string): void {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 3);
        this.otpStore.set(email, { otp, expiry });
    }

    verifyOTP(email: string, otp: string): boolean {
        const storedOTP = this.otpStore.get(email);
        if (!storedOTP) return false;
        if (new Date() > storedOTP.expiry) {
            this.otpStore.delete(email);
            return false;
        }
        return storedOTP.otp === otp;
    }

    clearOTP(email: string): void {
        this.otpStore.delete(email);
    }
}
