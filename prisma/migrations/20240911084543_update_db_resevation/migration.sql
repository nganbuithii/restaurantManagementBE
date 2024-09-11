/*
  Warnings:

  - You are about to drop the column `customerId` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `endTime` on the `reservation` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `reservation` table. All the data in the column will be lost.
  - Added the required column `date` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `time` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Reservation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_customerId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `customerId`,
    DROP COLUMN `endTime`,
    DROP COLUMN `startTime`,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `time` VARCHAR(191) NOT NULL,
    ADD COLUMN `userId` INTEGER NOT NULL,
    MODIFY `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING';

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
