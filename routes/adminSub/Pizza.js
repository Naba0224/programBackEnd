const express = require("express");
const router = express.Router();
const { createPizza } = require("../../controller/admin/pizza");
const { body } = require("express-validator");

router
  .route("/pizza")
  .post(
    body("name").notEmpty(),
    body("description").notEmpty(),
    body("price").notEmpty().isNumeric(),
    body("img").notEmpty(),
    createPizza
  );

module.exports = router;
