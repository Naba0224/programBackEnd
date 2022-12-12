const express = require("express");

const router = express.Router();
const { body } = require("express-validator");
const { signUp, login, refreshToken } = require("../../controller/client/auth");

router
  .route("/login")
  .post(body("email").isEmail(), body("password").notEmpty(), login);
router
  .route("/sign_up")
  .post(
    body("username").notEmpty(),
    body("password").notEmpty(),
    body("email").isEmail(),
    signUp
  );
router.route("/refresh_token").post(refreshToken);
module.exports = router;
