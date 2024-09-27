/*
  Warnings:

  - You are about to drop the column `customerId` on the `customervoucher` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,voucherId]` on the table `CustomerVoucher` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `CustomerVoucher` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `customervoucher` DROP FOREIGN KEY `CustomerVoucher_customerId_fkey`;

-- DropIndex
DROP INDEX `CustomerVoucher_customerId_voucherId_key` ON `customervoucher`;

-- AlterTable
ALTER TABLE `customervoucher` DROP COLUMN `customerId`,
    ADD COLUMN `userId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `CustomerVoucher_userId_voucherId_key` ON `CustomerVoucher`(`userId`, `voucherId`);

-- AddForeignKey
ALTER TABLE `CustomerVoucher` ADD CONSTRAINT `CustomerVoucher_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
