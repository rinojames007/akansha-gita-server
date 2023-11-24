-- CreateTable
CREATE TABLE "Organisers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Organisers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinators" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Coordinators_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteers" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "eventID" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "eventImageURL" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("eventID")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "registrationNumber" VARCHAR(10) NOT NULL,
    "branch" TEXT NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Organisers_email_key" ON "Organisers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinators_email_key" ON "Coordinators"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteers_email_key" ON "Volunteers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_email_key" ON "Participant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_registrationNumber_key" ON "Participant"("registrationNumber");
