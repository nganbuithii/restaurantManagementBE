/*
  Warnings:

  - Added the required column `pointCost` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `order` ADD COLUMN `usedVoucherId` INTEGER NULL;

-- AlterTable
ALTER TABLE `voucher` ADD COLUMN `pointCost` INTEGER NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL,
    ADD COLUMN `usedCount` INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE `CustomerVoucher` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customerId` INTEGER NOT NULL,
    `voucherId` INTEGER NOT NULL,
    `obtainedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `usedAt` DATETIME(3) NULL,

    UNIQUE INDEX `CustomerVoucher_customerId_voucherId_key`(`customerId`, `voucherId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Order` ADD CONSTRAINT `Order_usedVoucherId_fkey` FOREIGN KEY (`usedVoucherId`) REFERENCES `Voucher`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerVoucher` ADD CONSTRAINT `CustomerVoucher_customerId_fkey` FOREIGN KEY (`customerId`) REFERENCES `Customer`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `CustomerVoucher` ADD CONSTRAINT `CustomerVoucher_voucherId_fkey` FOREIGN KEY (`voucherId`) REFERENCES `Voucher`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
