const express = require("express");
const router = express.Router();
const {
  getOrders,
  confirmOrder,
  selectOrderProcess,
} = require("../../controller/admin/orders");

router
  .route("/order")
  .get(getOrders)
  .put(confirmOrder)
  .post(selectOrderProcess);
module.exports = router;
