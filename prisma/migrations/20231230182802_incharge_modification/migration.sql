/*
  Warnings:

  - Added the required column `eventName` to the `InchargeEvent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "InchargeEvent" ADD COLUMN     "eventName" TEXT NOT NULL;
