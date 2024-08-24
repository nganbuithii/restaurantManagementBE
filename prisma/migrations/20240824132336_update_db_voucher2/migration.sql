-- DropForeignKey
ALTER TABLE `voucher` DROP FOREIGN KEY `Voucher_customerId_fkey`;

-- AlterTable
ALTER TABLE `voucher` MODIFY `customerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Voucher` ADD CONSTRAINT `Voucher_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
