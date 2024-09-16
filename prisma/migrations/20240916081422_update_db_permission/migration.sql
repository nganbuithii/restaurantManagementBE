/*
  Warnings:

  - You are about to drop the column `action` on the `permission` table. All the data in the column will be lost.
  - You are about to drop the column `resource` on the `permission` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Permission_action_resource_key` ON `permission`;

-- AlterTable
ALTER TABLE `permission` DROP COLUMN `action`,
    DROP COLUMN `resource`,
    ADD COLUMN `apiPath` VARCHAR(191) NULL,
    ADD COLUMN `method` VARCHAR(191) NULL,
    ADD COLUMN `module` VARCHAR(191) NULL;
