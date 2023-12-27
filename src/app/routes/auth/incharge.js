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

router.post(`/signin`, async (req, res) => {
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
