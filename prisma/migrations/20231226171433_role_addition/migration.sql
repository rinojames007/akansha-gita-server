/*
  Warnings:

  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('organizer', 'coordinator', 'volunteer', 'student');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL;
