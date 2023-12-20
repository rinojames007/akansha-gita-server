import { error } from "console";
import * as express from "express";
import push from "web-push";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

let vapIDKeys = {
  publicKey: `${process.env.PUBLIC_KEY}`,
  privateKey: `${process.env.PRIVATE_KEY}`,
};

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.post("/receive", async (req, res) => {
  const { endpoint, expirationTime, keys, email } = req.body;

  if ((endpoint, expirationTime, keys, email)) {
    try {
      const entry = await prisma.pushSubscription.create({
        data: {
          email: email,
          endpoint: endpoint,
          expirationTime: expirationTime,
          auth: keys.auth,
          p256dh: keys.p256dh,
        },
      });

      if (entry) {
        res.status(200).json({
          message: "user subscription added successfully",
        });
      }
    } catch (error) {
      console.log("something broke");
    }
  }
  console.log(endpoint, expirationTime, keys.auth, keys.p256dh);
});

router.get("/send", async (req, res) => {
  push.setVapidDetails(
    "mailto:rinojames03@gmail.com",
    vapIDKeys.publicKey,
    vapIDKeys.privateKey
  );

  const data = await prisma.pushSubscription.findMany({
    where: {
      email: req.user,
    },
  });

  const sub = {
    endpoint: data.endpoint,
    expirationTime: data.expirationTime,
    keys: {
      auth: data.auth,
      p256dh: data.p256dh,
    },
  };

  console.log(sub);

  // let sub = {
  //   endpoint:
  //     "https://updates.push.services.mozilla.com/wpush/v2/gAAAAABlgGOPBYxVdOHdumc35m_2pqQ1OW0rqYt23vkxcOmg71R1n3aAI0XlauH57PwfcbKqSw7yjTIUFxuhtgBXB0Xf7Ehfa3r-tr9cvUGeACERI7cGUGbmemIDgtwzetBSJzBdlwSS64RRp1IT6Q9WaVMojdmgoUlA-eY796M8EzcXmkr0MDI",
  //   expirationTime: null,
  //   keys: {
  //     auth: "-5A_fw9U9QXNFq5LgdrKlw",
  //     p256dh:
  //       "BOh3AFdrlFhINS-vDdrmSw4jBIq7wulmjfXuCJPwlsdKgkNa7G4I1SVWC45xDUMTTJ2y_DXPmt3IcuzGanVCP8I",
  //   },
  // };
  // push
  //   .sendNotification(sub, "test message")
  //   .then((res) => {
  //     console.log(res);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
});

export default router;
