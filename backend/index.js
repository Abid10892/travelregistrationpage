import express, { Router } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import Connection from "./database/db.js";
import router from "./routes/route.js";

dotenv.config();

const app = express();
const PORT = 8000;

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", router);
Connection(username, password);

app.listen(PORT, () =>
  console.log(`Server is running successfully on PORT ${PORT}`)
);
