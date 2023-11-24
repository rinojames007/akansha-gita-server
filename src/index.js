import user from "./app/routes/user.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/user", user);

// async function main() {

// //   const allUsers = await prisma.coordinators.create({
// //     data: {
// //         email: 'rinojames',
// //         password: 'something'
// //     }
// //   });

// //   console.log(allUsers);
// }

// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })

//   .catch(async (e) => {
//     console.error(e);

//     await prisma.$disconnect();

//     process.exit(1);
//   });
app.listen(3000, () => {
    console.log("server started")
})
