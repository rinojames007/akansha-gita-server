import * as express from "express";
import {userAuthentication} from "../../../services/middlewares.js";
import {PrismaClient} from "@prisma/client";

const router = express.Router();

const prisma = new PrismaClient();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

// event creation endpoint
router.post("/create", userAuthentication, async (req, res) => {
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
    res.json({message: 'check inputs properly'});
    console.log("something broke", e);
  }
});

// event updation endpoint
router.patch("/update", userAuthentication, async (req, res) => {
  const {
    id,
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
        id: id
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
    res.json({message: 'check inputs properly'});
    console.log("something broke", e);
  }
});


router.delete("/remove", userAuthentication, async (req, res) => {
  const {
    id,
  } = req.body;

  const eventID = await prisma.event.findUnique({
    where: {
      id: id
    }
  })
  if(eventID) {
    try {
      const entry = await prisma.event.delete({
        where: {
          id: id
        }
      });

      if (entry) {
        res.status(200).json({
          message: "event deleted successfully!",
        });
      } else {
      }
    } catch (e) {

      console.log("something broke", e);
    }
  }
  res.status(500).json({message: 'invalid event id provided'});
});
export default router;
