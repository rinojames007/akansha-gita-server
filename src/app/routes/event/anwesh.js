import * as express from "express";
import { userAuthentication } from "../../../services/middlewares.js";
import { PrismaClient } from "@prisma/client";

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
            day: "anwesh"
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
    * fetches all the events for the boys
    */
    router.get("/boys", userAuthentication, async (req, res) => {
        const events = await prisma.event.findMany({
            where: {
                day: "anwesh", gender: 'boys'
            }
        })
        if (events) {
            res.json(events);
        }
    })

/**
 * fetches all the boy participants of a specific event
 */
router.get('/:eventID/participants/boys', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const eventParticipants = await prisma.event.findUnique({
        where: { id: eventID, gender: "boys" },
        include: {
            participants: true
        }
    })
    if (eventParticipants) {
        res.status(200).json(eventParticipants)
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
                day: 'anwesh',
                course: course,
                year: year,
                branch: branch,
                gender: 'boys',
                phone: phone,
                email: email,
                stay: stay,
                events: {
                    connect: [{ id: eventID }]
                }
            }
        })
        if (entry) {
            res.status(200).json({
                message: "participant added successfully"
            })
        } else {
            res.status(403).json({
                message: "some error occurred"
            })
        }
    }
})

router.post('/boys/:eventID/remove', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const email = req.user;
    const result = await prisma.participant.update({
        where: { email: email },
        data: {
            events: {
                disconnect: [{ id: eventID }]
            }
        }
    });
    if (result) {
        res.status(200).json({
            message: "participant removed successfully"
        })
    }

})

/**
 * fetches all the events for the girls
 */
router.get("/girls", userAuthentication, async (req, res) => {
    const events = await prisma.event.findMany({
        where: {
            day: "anwesh", gender: 'girls'
        }
    })
    if (events) {
        res.json(events);
    }
})

/**
 * fetches all the girl participants of a specific event
 */
router.get('/:eventID/participants/girls', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const eventParticipants = await prisma.event.findUnique({
        where: { id: eventID, gender: "girls" },
        include: {
            participants: true
        }
    })
    if (eventParticipants) {
        res.status(200).json(eventParticipants)
    }
})

/**
 * event participation for the girls
 */
router.post('/girls/:eventID/participate', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const {
        name, rollNumber, course, year, branch, gender, phone, email, stay
    } = req.body
    if (eventID) {
        const entry = await prisma.participant.create({
            data: {
                name: name,
                rollNumber: rollNumber,
                day: 'anwesh',
                course: course,
                year: year,
                branch: branch,
                gender: 'girls',
                phone: phone,
                email: email,
                stay: stay,
                events: {
                    connect: [{ id: eventID }]
                }
            }
        })
        if (entry) {
            res.status(200).json({
                message: "participant added successfully"
            })
        } else {
            res.status(403).json({
                message: "some error occurred"
            })
        }
    }
})

/**
 * Removal of girl from an event
 */
router.post('/girls/:eventID/remove', userAuthentication, async (req, res) => {
    const eventID = req.params.eventID;
    const email = req.user;
    const result = await prisma.participant.update({
        where: { email: email },
        data: {
            events: {
                disconnect: [{ id: eventID }]
            }
        }
    });
    if (result) {
        res.status(200).json({
            message: "participant removed successfully"
        })
    }

})

export default router;
