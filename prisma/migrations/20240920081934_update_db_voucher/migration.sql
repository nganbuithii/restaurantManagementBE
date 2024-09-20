/*
  Warnings:

  - You are about to drop the column `customerId` on the `voucher` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `Voucher_customerId_fkey`;

-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `customerId`;
