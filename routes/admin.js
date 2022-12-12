const express = require("express");
const router = express.Router();
const pizza = require("./adminSub/Pizza");

router.use("/", pizza);
module.exports = router;
