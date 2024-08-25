/*
  Warnings:

  - You are about to drop the column `userId` on the `supplier` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `Supplier` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `supplier` DROP FOREIGN KEY `Supplier_userId_fkey`;

-- AlterTable
ALTER TABLE `supplier` DROP COLUMN `userId`,
    ADD COLUMN `createdBy` INTEGER NULL,
    ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `updatedBy` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Supplier_email_key` ON `Supplier`(`email`);
