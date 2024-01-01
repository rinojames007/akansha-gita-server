/*
  Warnings:

  - Added the required column `enum` to the `Incharge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Incharge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `Incharge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roll` to the `Incharge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wpNo` to the `Incharge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incharge" ADD COLUMN     "enum" "EventDay" NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "roll" TEXT NOT NULL,
ADD COLUMN     "wpNo" TEXT NOT NULL;
