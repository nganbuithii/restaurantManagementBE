/*
  Warnings:

  - You are about to drop the column `employeeId` on the `ingredient` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `menuitem` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `ingredient` DROP FOREIGN KEY `Ingredient_employeeId_fkey`;

-- AlterTable
ALTER TABLE `ingredient` DROP COLUMN `employeeId`,
    ADD COLUMN `createdBy` INTEGER NULL;

-- AlterTable
ALTER TABLE `menuitem` DROP COLUMN `status`,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `updatedBy` INTEGER NULL;
