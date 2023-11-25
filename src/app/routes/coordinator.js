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

router.post(`/${process.env.COORDINATOR_ROUTE}/signup`, (req, res) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 6;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = await prisma.coordinators.create({
          data: {
            email: email,
            password: hash,
          },
        });
        if (newUser) {
          const token = jwt.sign(email, SECRET);
          res.status(200).json({
            message: "user added successfully",
            token: token,
          });
        }
      });
    });
  } catch (error) {
    console.log("something broke ", e);
  }
});

router.post(`/${process.env.COORDINATOR_ROUTE}/signin`, async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.coordinators.findUnique({
    where: {
      email: email
    },
  });
  if (user) {
    const userHash = user.password;
    const result = bcrypt.compare(password, userHash);
    if (result) {
      const token = jwt.sign(email, SECRET);
      res.status(200).json({
        message: "user found successfully",
        token: token,
      });
    } else {
      res.status(403).json({
        message: "invalid credentials",
      });
    }
  }
});

export default router;
