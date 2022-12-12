const express = require("express");
const router = express.Router();
const {
  removeFromCart,
  addToCart,
  getCartItems,
} = require("../../controller/client/cart");

router.route("/cart").post(addToCart).get(getCartItems).delete(removeFromCart);

module.exports = router;
