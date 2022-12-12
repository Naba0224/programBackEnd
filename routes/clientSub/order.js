const express = require("express");
const router = express.Router();
const {
  getOrders,
  createOrder,
  deleteOrder,
} = require("../../controller/client/order");

router.route("/order").post(createOrder).get(getOrders).delete(deleteOrder);
module.exports = router;
