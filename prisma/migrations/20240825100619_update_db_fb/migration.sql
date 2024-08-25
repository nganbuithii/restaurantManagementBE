-- AlterTable
ALTER TABLE `feedback` ADD COLUMN `parentId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Feedback` ADD CONSTRAINT `Feedback_parentId_fkey` FOREIGN KEY (`parentId`) REFERENCES `Feedback`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
