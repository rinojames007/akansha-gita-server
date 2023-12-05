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
 * CREATE AN EVENT
 */
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
    res.json({ message: "something broke" });
  }
});

/**
 * UPDATING A SPECIFIC EVENT DETAILS
 */
router.patch("/:eventID", userAuthentication, async (req, res) => {
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
          id:  eventID
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

/**
 * DELETING AN EVENT
 */
router.delete("/:eventID", userAuthentication, async (req, res) => {
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
