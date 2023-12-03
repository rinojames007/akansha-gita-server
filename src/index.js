import user from "./app/routes/auth/user.js";
import organizer from "./app/routes/auth/organizer.js";
import coordinator from "./app/routes/auth/coordinator.js";
import volunteer from './app/routes/auth/volunteer.js';
import event from "./app/routes/event/event.js"
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", user);
app.use("/organizer", organizer);
app.use("/coordinator", coordinator);
app.use("/volunteer", volunteer);
app.use("/event", event);


app.listen(3000, () => {
  console.log("server started");
});
