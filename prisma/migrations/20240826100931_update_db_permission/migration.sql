/*
  Warnings:

  - A unique constraint covering the columns `[action,resource]` on the table `Permission` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `Permission_action_key` ON `permission`;

-- CreateIndex
CREATE UNIQUE INDEX `Permission_action_resource_key` ON `Permission`(`action`, `resource`);
