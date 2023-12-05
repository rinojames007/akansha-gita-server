import * as express from "express";
import bcrypt from "bcrypt";
import {PrismaClient} from "@prisma/client";
import jwt from "jsonwebtoken";

const router = express.Router();
const prisma = new PrismaClient();
const SECRET = `${process.env.JWT_SECRET}`;

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.post(`/${process.env.INCHARGE_ROUTE}/signup`, (req, res) => {
  try {
    const { email, password } = req.body;
    const saltRounds = 6;
    bcrypt.genSalt(saltRounds, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        const newUser = await prisma.incharge.create({
          data: {
            email: email,
            password: hash,
          },
        });
        if (newUser) {
          const token = jwt.sign(email, SECRET, { expiresIn: '2 days' });
          res.status(200).json({
            message: "user added successfully",
            token: token,
          });
        }
      });
    });
    res.status(401).json({
      message: "email address already exists"
    })
  } catch (error) {
    console.log("something broke ", e);
  }
});

router.post(`/${process.env.INCHARGE_ROUTE}/signin`, async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.incharge.findUnique({
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
        message: "login successful",
        token: token,
      });
    } else {
      res.status(403).json({
        message: "invalid credentials",
      });
    }
  }
  res.status(401).json({
    message: "failed to find user"
  })
});

export default router;