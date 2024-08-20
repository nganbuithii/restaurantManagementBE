-- DropForeignKey
ALTER TABLE `menuitem` DROP FOREIGN KEY `MenuItem_menuId_fkey`;

-- AlterTable
ALTER TABLE `menuitem` MODIFY `menuId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `MenuItem` ADD CONSTRAINT `MenuItem_menuId_fkey` FOREIGN KEY (`menuId`) REFERENCES `Menu`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
