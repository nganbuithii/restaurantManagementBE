/*
  Warnings:

  - You are about to drop the column `tableId` on the `reservation` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[orderId]` on the table `Reservation` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `reservation` DROP FOREIGN KEY `Reservation_tableId_fkey`;

-- AlterTable
ALTER TABLE `reservation` DROP COLUMN `tableId`,
    ADD COLUMN `orderId` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Reservation_orderId_key` ON `Reservation`(`orderId`);

-- AddForeignKey
ALTER TABLE `Reservation` ADD CONSTRAINT `Reservation_orderId_fkey` FOREIGN KEY (`orderId`) REFERENCES `Order`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
