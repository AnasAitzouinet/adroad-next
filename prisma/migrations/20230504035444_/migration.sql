-- AlterTable
ALTER TABLE `users` ADD COLUMN `about` VARCHAR(191) NULL,
    ADD COLUMN `userName` VARCHAR(191) NOT NULL DEFAULT 'user';
