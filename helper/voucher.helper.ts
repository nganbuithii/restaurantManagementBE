import { randomBytes } from 'crypto';

export function generateVoucherCode(): string {
    return randomBytes(4).toString('hex').toUpperCase(); 
}
