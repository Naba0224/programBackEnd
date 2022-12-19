const express = require("express");
const router = express.Router();
const { createAdmin, login } = require("../../controller/admin/auth");

router.route("/login").post(login);

module.exports = router;
