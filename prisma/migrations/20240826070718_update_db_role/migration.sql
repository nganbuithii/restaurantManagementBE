/*
  Warnings:

  - A unique constraint covering the columns `[action]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `resource` to the `Permission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `permission` ADD COLUMN `resource` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Permission_action_key` ON `Permission`(`action`);
