-- AlterTable
ALTER TABLE `ingredient` ADD COLUMN `deletedBy` INTEGER NULL,
    ADD COLUMN `updatedBy` INTEGER NULL;
