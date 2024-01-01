/*
  Warnings:

  - The primary key for the `Incharge` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "InchargeEvent" DROP CONSTRAINT "InchargeEvent_inchargeID_fkey";

-- AlterTable
ALTER TABLE "Incharge" DROP CONSTRAINT "Incharge_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Incharge_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Incharge_id_seq";

-- AlterTable
ALTER TABLE "InchargeEvent" ALTER COLUMN "inchargeID" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "InchargeEvent" ADD CONSTRAINT "InchargeEvent_inchargeID_fkey" FOREIGN KEY ("inchargeID") REFERENCES "Incharge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
