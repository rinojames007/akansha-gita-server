-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('boys', 'girls');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "gender" TEXT NOT NULL DEFAULT '';
