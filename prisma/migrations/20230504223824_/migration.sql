/*
  Warnings:

  - You are about to drop the column `lastname` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `lastname`,
    ADD COLUMN `adress` VARCHAR(191) NULL,
    ADD COLUMN `lastName` VARCHAR(191) NULL;
