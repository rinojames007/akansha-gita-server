/*
  Warnings:

  - You are about to drop the `Participant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Participant";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Participants" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registrationNumber" VARCHAR(10) NOT NULL,
    "branch" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Participants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Participants_email_key" ON "Participants"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participants_registrationNumber_key" ON "Participants"("registrationNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");
