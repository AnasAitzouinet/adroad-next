/*
  Warnings:

  - The `emailVerified` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `emailVerified`,
    ADD COLUMN `emailVerified` BOOLEAN NULL DEFAULT false,
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `lastname` VARCHAR(191) NULL,
    MODIFY `phone_number` INTEGER NULL;
