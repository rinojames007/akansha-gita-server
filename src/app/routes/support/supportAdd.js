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


router.post("/addperson", async (req, res) => {
    const { email, role, password } = req.body;
    const saltRounds = 4;

    if (role === "volunteer") {
        try {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    try {
                        const newUser = await prisma.volunteer.create({
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
    } else if (role === "coordinator") {
        try {
            bcrypt.genSalt(saltRounds, function(err, salt) {
                bcrypt.hash(password, salt, async function(err, hash) {
                    try {
                        const newUser = await prisma.coordinator.create({
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
    } else if (role === "incharge") {
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
export default router;
