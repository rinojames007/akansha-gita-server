-- CreateEnum
CREATE TYPE "EventDay" AS ENUM ('ahwan', 'anwesh');

-- CreateEnum
CREATE TYPE "stayEvent" AS ENUM ('hosteller', 'dayboarder');

-- CreateTable
CREATE TABLE "Event" (
    "id" TEXT NOT NULL,
    "day" "EventDay" NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "gender" TEXT NOT NULL DEFAULT '',
    "itemsRequired" TEXT NOT NULL,
    "rules" TEXT NOT NULL,
    "eventImageURL" TEXT NOT NULL,
    "eventTime" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Incharge" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Incharge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InchargeEvent" (
    "id" SERIAL NOT NULL,
    "inchargeID" INTEGER NOT NULL,
    "eventID" TEXT NOT NULL,

    CONSTRAINT "InchargeEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoordinatorEvent" (
    "id" SERIAL NOT NULL,
    "coordinatorID" INTEGER NOT NULL,
    "eventID" TEXT NOT NULL,

    CONSTRAINT "CoordinatorEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Organiser" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Organiser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrganiserEvent" (
    "id" SERIAL NOT NULL,
    "organiserID" INTEGER NOT NULL,
    "eventID" TEXT NOT NULL,

    CONSTRAINT "OrganiserEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordinator" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Coordinator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Volunteer" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Volunteer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VolunteerEvent" (
    "id" SERIAL NOT NULL,
    "volunteerID" INTEGER NOT NULL,
    "eventID" TEXT NOT NULL,

    CONSTRAINT "VolunteerEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Participant" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rollNumber" VARCHAR(10) NOT NULL,
    "day" "EventDay" NOT NULL,
    "course" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "branch" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "phone" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "stay" "stayEvent" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Participant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventAttendance" (
    "id" SERIAL NOT NULL,
    "participantID" INTEGER NOT NULL,
    "eventID" TEXT NOT NULL,
    "attended" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventAttendance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_EventToParticipant" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Incharge_email_key" ON "Incharge"("email");

-- CreateIndex
CREATE UNIQUE INDEX "InchargeEvent_inchargeID_eventID_key" ON "InchargeEvent"("inchargeID", "eventID");

-- CreateIndex
CREATE UNIQUE INDEX "CoordinatorEvent_coordinatorID_eventID_key" ON "CoordinatorEvent"("coordinatorID", "eventID");

-- CreateIndex
CREATE UNIQUE INDEX "Organiser_email_key" ON "Organiser"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Coordinator_email_key" ON "Coordinator"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Volunteer_email_key" ON "Volunteer"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VolunteerEvent_volunteerID_eventID_key" ON "VolunteerEvent"("volunteerID", "eventID");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_name_key" ON "Participant"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Participant_rollNumber_key" ON "Participant"("rollNumber");

-- CreateIndex
CREATE UNIQUE INDEX "EventAttendance_participantID_eventID_key" ON "EventAttendance"("participantID", "eventID");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_EventToParticipant_AB_unique" ON "_EventToParticipant"("A", "B");

-- CreateIndex
CREATE INDEX "_EventToParticipant_B_index" ON "_EventToParticipant"("B");

-- AddForeignKey
ALTER TABLE "InchargeEvent" ADD CONSTRAINT "InchargeEvent_inchargeID_fkey" FOREIGN KEY ("inchargeID") REFERENCES "Incharge"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InchargeEvent" ADD CONSTRAINT "InchargeEvent_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorEvent" ADD CONSTRAINT "CoordinatorEvent_coordinatorID_fkey" FOREIGN KEY ("coordinatorID") REFERENCES "Coordinator"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoordinatorEvent" ADD CONSTRAINT "CoordinatorEvent_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganiserEvent" ADD CONSTRAINT "OrganiserEvent_organiserID_fkey" FOREIGN KEY ("organiserID") REFERENCES "Organiser"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrganiserEvent" ADD CONSTRAINT "OrganiserEvent_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerEvent" ADD CONSTRAINT "VolunteerEvent_volunteerID_fkey" FOREIGN KEY ("volunteerID") REFERENCES "Volunteer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VolunteerEvent" ADD CONSTRAINT "VolunteerEvent_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendance" ADD CONSTRAINT "EventAttendance_eventID_fkey" FOREIGN KEY ("eventID") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventAttendance" ADD CONSTRAINT "EventAttendance_participantID_fkey" FOREIGN KEY ("participantID") REFERENCES "Participant"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToParticipant" ADD CONSTRAINT "_EventToParticipant_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventToParticipant" ADD CONSTRAINT "_EventToParticipant_B_fkey" FOREIGN KEY ("B") REFERENCES "Participant"("id") ON DELETE CASCADE ON UPDATE CASCADE;
