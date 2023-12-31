/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `PushSubscription` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `PushSubscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PushSubscription" ADD COLUMN     "email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PushSubscription_email_key" ON "PushSubscription"("email");
