/*
  Warnings:

  - You are about to drop the column `createdAt` on the `voucher` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `voucher` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `voucher` DROP COLUMN `createdAt`,
    DROP COLUMN `updatedAt`;

-- CreateIndex
CREATE INDEX `Customer_userId_idx` ON `Customer`(`userId`);
