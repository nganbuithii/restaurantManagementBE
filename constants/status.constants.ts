export const VALID_STATUS = ['available', 'out_of_stock', 'pending'];

export function isValidStatus(status: string): boolean {
    return VALID_STATUS.includes(status);
}
