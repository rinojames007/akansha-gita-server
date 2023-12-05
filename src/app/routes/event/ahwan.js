import * as express from "express";
import {userAuthentication} from "../../../services/middlewares.js";
import {PrismaClient} from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});

/**
 * fetches all the events of ahwan
 */
router.get("/", userAuthentication, async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            day: "Ahwan"
        }
    })
    if (events) {
        res.json(events);
    }
})

/**
 * fetches specific event details
 */
router.get("/info/:eventID", userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    try {
        const foundEvent = await prisma.event.findUnique({
            where: {
                id: eventID
            }
        });

        if (foundEvent) {
            res.json(foundEvent)
        } else {
            res.status(500).json({
                message: "error finding event"
            })
        }
    } catch (e) {
        console.log("error", e);
    }
})

/**
 * fetches all the participants of a specific event
 */
router.get('/:eventID/participants', userAuthentication, async(req, res) => {
    const eventID = req.params.eventID;
    try {
        const eventParticipants = await prisma.event.findUnique({
            where: { id: eventID},
            include: {
                participants: true
            }
        })
        if(eventParticipants){
            res.status(200).json(eventParticipants)
        }
    } catch (e) {
        console.log(e);
    }
})

/**
 * fetches all the boy participants of a specific event
 */
router.get('/:eventID/participants/boys', userAuthentication, async(req, res) => {
    const eventID = req.params.eventID;
    const eventParticipants = await prisma.event.findUnique({
        where: { id: eventID, gender: "boys"},
        include: {
            participants: true
        }
    })
    if(eventParticipants){
        res.status(200).json(eventParticipants)
    }
})

/**
 * fetches all the events for the boys
 */
router.get("/boys", userAuthentication, async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            day: "Ahwan", gender: 'boys'
        }
    })
    if (events) {
        res.json(events);
    }
})

/**
 * event participation for the boys
 */
router.post('/boys/:eventID/participate', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const {
        name, rollNumber, course, year, branch, gender, phone, email, stay
    } = req.body
    if (eventID) {
        const entry = await prisma.participant.create({
            data: {
                name: name,
                rollNumber: rollNumber,
                day: 'ahwan',
                course: course,
                year: year,
                branch: branch,
                gender: gender,
                phone: phone,
                email: email,
                stay: stay,
                events: {
                    connect: [{ id: eventID }]
                }
            }
        })
        if(entry){

        }
    }
})

router.post('/boys/:eventID/remove', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const findParticipant = await prisma.event.findUnique({
        where: {id: eventID},
        include: {
            participants: true
        }
    })
    console.log(findParticipant.participants)

})

/**
 * fetches all the events for the girls
 */
router.get("/girls", userAuthentication, async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            day: "Ahwan", gender: 'girls'
        }
    })
    if (events) {
        res.json(events);
    }
})

export default router;