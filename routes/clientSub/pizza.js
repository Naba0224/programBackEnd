const express = require("express");

const router = express.Router();
const { getPizza, getPizzaDetail } = require("../../controller/client/pizza");
const { query } = require("express-validator");

router.route("/pizza").get(getPizza);
router.route("/pizza_detail").get(query("id").notEmpty(), getPizzaDetail);
module.exports = router;
