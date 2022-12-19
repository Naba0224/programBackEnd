const express = require("express");
const router = express.Router();
const pizza = require("./adminSub/Pizza");
const auth = require("./adminSub/auth");
const order = require("./adminSub/orders");

router.use("/auth", auth);
router.use("/", pizza);
router.use("/", order);
module.exports = router;
