/*
  Warnings:

  - You are about to drop the column `enum` on the `Incharge` table. All the data in the column will be lost.
  - Added the required column `eventDay` to the `Incharge` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Incharge" DROP COLUMN "enum",
ADD COLUMN     "eventDay" "EventDay" NOT NULL;
