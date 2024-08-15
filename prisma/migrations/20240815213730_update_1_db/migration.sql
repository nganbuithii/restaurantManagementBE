/*
  Warnings:

  - Added the required column `status` to the `Ingredient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Suppliers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Table` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `feedbacks` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `ingredient` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `role` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE `suppliers` ADD COLUMN `isActive` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `table` ADD COLUMN `status` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `isActive` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `startDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
