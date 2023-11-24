import * as express from "express";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/signup", (req, res) => {
  const { email, password } = req.body;
  const saltRounds = 6;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(password, salt, async function (err, hash) {
      await prisma.coordinators
        .create({
          data: {
            email: email,
            password: hash,
          },
        })
        .then(
          res.json({
            message: "user added successfully",
          })
        )
        .catch((e) => {
          console.log(e);
        });
    });
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.coordinators.findUnique({
    where: {
      email: email,
    },
  });
  if (user) {
    const userHash = user.password;
    const result = bcrypt.compare(password, userHash);
    if (result) {
      console.log("user found");
    }
  }
});

export default router;
