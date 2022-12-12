const express = require("express");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");
const adminRoutes = require("./routes/admin");
const clientRoutes = require("./routes/cliient");
dotenv.config({ path: "./config/config.env" });

connectDB();
app.use(express.json());
app.use(cors());
app.use("/admin", adminRoutes);
app.use("/client", clientRoutes);

app.use(errorHandler);
app.listen(process.env.PORT, () =>
  console.log(`started on ${process.env.PORT}`)
);
