-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'supportteam';

-- CreateTable
CREATE TABLE "HelpSupport" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "HelpSupport_pkey" PRIMARY KEY ("email")
);

-- CreateIndex
CREATE UNIQUE INDEX "HelpSupport_email_key" ON "HelpSupport"("email");
