/*
  Warnings:

  - Added the required column `name` to the `Coordinator` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Incharge` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Organiser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Volunteer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Coordinator" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Incharge" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Organiser" ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Volunteer" ADD COLUMN     "name" TEXT NOT NULL;
