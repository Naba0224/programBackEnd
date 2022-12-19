const express = require("express");
const router = express.Router();
const {
  removeFromCart,
  addToCart,
  getCartItems,
} = require("../../controller/client/cart");

router.route("/cart").post(addToCart).get(getCartItems);
router.route("/cart_delete").post(removeFromCart);

module.exports = router;
