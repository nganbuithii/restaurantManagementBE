/*
  Warnings:

  - You are about to drop the column `employeeId` on the `warehouseslip` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `warehouseslip` DROP FOREIGN KEY `WarehouseSlip_employeeId_fkey`;

-- AlterTable
ALTER TABLE `warehouseslip` DROP COLUMN `employeeId`,
    ADD COLUMN `userId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `WarehouseSlip` ADD CONSTRAINT `WarehouseSlip_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
