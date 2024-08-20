/*
  Warnings:

  - You are about to drop the column `userId` on the `menuitem` table. All the data in the column will be lost.
  - Added the required column `createdBy` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `menuitem` DROP FOREIGN KEY `MenuItem_userId_fkey`;

-- AlterTable
ALTER TABLE `menuitem` DROP COLUMN `userId`,
    ADD COLUMN `createdBy` INTEGER NOT NULL;
