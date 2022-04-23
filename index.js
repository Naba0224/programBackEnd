const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
dotenv.config({ path: "./config/config.env" });

app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () =>
  console.log(`started on ${process.env.PORT}`)
);
