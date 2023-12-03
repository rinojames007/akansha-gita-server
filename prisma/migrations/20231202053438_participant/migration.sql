/*
  Warnings:

  - You are about to drop the column `eventDay` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Participant` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `day` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Participant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stay` to the `Participant` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "EventDay" AS ENUM ('Ahwan', 'Anwesh', 'Akansha');

-- DropIndex
DROP INDEX "Participant_email_key";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "eventDay",
ADD COLUMN     "day" "EventDay" NOT NULL;

-- AlterTable
ALTER TABLE "Participant" DROP COLUMN "password",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "phone" INTEGER NOT NULL,
ADD COLUMN     "stay" TEXT NOT NULL,
ALTER COLUMN "year" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_key" ON "Participant"("name");
