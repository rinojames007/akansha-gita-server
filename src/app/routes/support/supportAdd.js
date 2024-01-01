import * as express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();

const SECRET = `${process.env.JWT_SECRET}`;

router.use((req, res, next) => {
    console.log("Time: ", Date.now());
    next();
});


// the events will be displayed to the support team for them to assign 
// volunteers, coordinators and incharges for the events
router.post("/addperson", async (req, res) => {
    const {
        role,
        eventDay,
        eventId,
        eventName,
        inChargeID,
        name,
        roll,
        email,
        password,
        phone,
        wpNo
    } = req.body;
    const saltRounds = 4;

    if (role === "incharge") {
        try {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    try {
                        const newUser = await prisma.incharge.create({
                            data: {
                                role,
                                eventDay,
                                name,
                                roll,
                                email,
                                password,
                                phone,
                                wpNo,
                                events: {
                                    create: [
                                        {
                                            event: {
                                                id: eventId
                                            },
                                            eventName
                                        }
                                    ]
                                },
                            }
                        });
                        if (newUser) {
                            res.status(200).json({
                                message: "user added successfully",
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
            });
        } catch (e) {
            res.json(403).json({
                message: "error adding user"
            });
        }
    } else if (role === "coordinator") {
        try {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    try {
                        const newUser = await prisma.coordinator.create({
                            data: {
                                role,
                                eventDay,
                                name,
                                roll,
                                email,
                                password,
                                phone,
                                wpNo,
                                events: {
                                    create: [
                                        {
                                            event: {
                                                id: eventId
                                            },
                                            eventName
                                        }
                                    ]
                                },
                            }
                        });
                        if (newUser) {
                            res.status(200).json({
                                message: "user added successfully",
                            });
                        }
                    } catch (e) {
                        console.log(e);
                    }
                });
            });
        } catch (e) {
            res.json(403).json({
                message: "error adding user"
            });
        }
    } else if (role === "icharge") {
        try {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    try {
                        const newUser = await prisma.incharge.create({
                            data: {
                                email: email,
                                password: hash,
                            },
                        });
                        if (newUser) {
                            res.status(200).json({
                                message: "user added successfully",
                            });
                        }
                    } catch (e) {
                        res.status(401).json({
                            message: "email address already exists"
                        })
                    }
                });
            });
        } catch (e) {
            res.json(403).json({
                message: "error adding user"
            });
        }
    } else if (role === "organizer") {
        try {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    try {
                        const newUser = await prisma.organiser.create({
                            data: {
                                email: email,
                                password: hash,
                            },
                        });
                        if (newUser) {
                            res.status(200).json({
                                message: "user added successfully",
                            });
                        }
                    } catch (e) {
                        res.status(401).json({
                            message: "email address already exists"
                        })
                    }
                });
            });
        } catch (e) {
            res.json(403).json({
                message: "error adding user"
            });
        }
    }
})


// EVENTS 
/** CREATE AN EVENT */
router.post("/event/create", async (req, res) => {
    const {
        day,
        name,
        description,
        gender,
        itemsRequired,
        rules,
        eventImageURL,
        eventTime,
    } = req.body;

    try {
        const entry = await prisma.event.create({
            data: {
                name: name, day: day,
                description: description,
                gender: gender,
                itemsRequired: itemsRequired,
                rules: rules,
                eventImageURL: eventImageURL,
                eventTime: eventTime,
            },
        });

        if (entry) {
            res.status(200).json({
                message: "event added successfully!",
            });
        }
    } catch (e) {
        res.json({ message: "something broke" });
    }
});

/**
 * UPDATING A SPECIFIC EVENT DETAILS
 */
router.patch("/:eventID", async (req, res) => {
    const eventID = req.params.eventID;
    const {
        day,
        name,
        description,
        gender,
        itemsRequired,
        rules,
        eventImageURL,
        eventTime,
    } = req.body;

    try {
        const entry = await prisma.event.update({
            where: {
                id: eventID
            },
            data: {
                name: name,
                day: day,
                description: description,
                gender: gender,
                itemsRequired: itemsRequired,
                rules: rules,
                eventImageURL: eventImageURL,
                eventTime: eventTime,
            },
        });

        if (entry) {
            res.status(200).json({
                message: "event added successfully!",
            });
        }
    } catch (e) {
        res.json({ message: 'check inputs properly' });
        console.log("something broke", e);
    }
});

/**
 * DELETING AN EVENT
 */
router.delete("/:eventID", async (req, res) => {
    const eventID = req.params.eventID;
    try {
        const entry = await prisma.event.delete({
            where: {
                id: eventID
            }
        });

        if (entry) {
            res.status(200).json({
                message: "event deleted successfully!",
            });
        } else {
            res.json({
                message: "some error occurred"
            })
        }
    } catch (e) {
        res.json({
            message: " event doesnt exist"
        })
    }
});

/**
 * CREATE AN EVENT
 */
router.post("/create", async (req, res) => {
    const {
        day,
        name,
        description,
        gender,
        itemsRequired,
        rules,
        eventImageURL,
        eventTime,
    } = req.body;

    try {
        const entry = await prisma.event.create({
            data: {
                name: name,
                day: day,
                description: description,
                gender: gender,
                itemsRequired: itemsRequired,
                rules: rules,
                eventImageURL: eventImageURL,
                eventTime: eventTime,
            },
        });

        if (entry) {
            res.status(200).json({
                message: "event added successfully!",
            });
        }
    } catch (e) {
        res.json({ message: "something broke" });
    }
});

/**
 * UPDATING A SPECIFIC EVENT DETAILS
 */
router.patch("/:eventID", async (req, res) => {
    const eventID = req.params.eventID;
    const {
        day,
        name,
        description,
        gender,
        itemsRequired,
        rules,
        eventImageURL,
        eventTime,
    } = req.body;

    try {
        const entry = await prisma.event.update({
            where: {
                id: eventID
            },
            data: {
                name: name,
                day: day,
                description: description,
                gender: gender,
                itemsRequired: itemsRequired,
                rules: rules,
                eventImageURL: eventImageURL,
                eventTime: eventTime,
            },
        });

        if (entry) {
            res.status(200).json({
                message: "event added successfully!",
            });
        }
    } catch (e) {
        res.json({ message: 'check inputs properly' });
        console.log("something broke", e);
    }
});

/**
 * DELETING AN EVENT
 */
router.delete("/:eventID", async (req, res) => {
    const eventID = req.params.eventID;
    try {
        const entry = await prisma.event.delete({
            where: {
                id: eventID
            }
        });

        if (entry) {
            res.status(200).json({
                message: "event deleted successfully!",
            });
        } else {
            res.json({
                message: "some error occurred"
            })
        }
    } catch (e) {
        res.json({
            message: " event doesnt exist"
        })
    }
});


export default router;
