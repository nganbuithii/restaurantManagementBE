-- CreateTable
CREATE TABLE `_ReservationMenuItems` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_ReservationMenuItems_AB_unique`(`A`, `B`),
    INDEX `_ReservationMenuItems_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_ReservationMenuItems` ADD CONSTRAINT `_ReservationMenuItems_A_fkey` FOREIGN KEY (`A`) REFERENCES `MenuItem`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_ReservationMenuItems` ADD CONSTRAINT `_ReservationMenuItems_B_fkey` FOREIGN KEY (`B`) REFERENCES `Reservation`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
