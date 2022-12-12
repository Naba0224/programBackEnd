const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const { validationResult } = require("express-validator");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
exports.signUp = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new MyError(`${errors.array()}`, 400);
  }
  //check if the username or email is duplicated or not
  const theUserByUsername = await User.find({
    $or: [{ username: req.body.username }, { email: req.body.email }],
  }).lean();
  if (theUserByUsername.length > 0) {
    throw new MyError("username or email exist");
  }

  await User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  res.status(200).json({
    success: true,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new MyError(`${errors.array()}`, 400);
  }
  const { email, password } = req.body;
  //check if user exists or not

  const theUser = await User.findOne({ email: email });
  if (!theUser) {
    throw new MyError("wrong email or password", 400);
  }
  //check the password
  const passwordCheck = await theUser.passwordChecker(password);
  if (!passwordCheck) {
    throw new MyError("wrong email or password", 400);
  }
  //respond with accessToken and refreshToken
  res.status(200).json({
    success: true,
    accessToken: theUser.getJWT(),
    refreshToken: theUser.getRefresh(),
  });
});

exports.refreshToken = asyncHandler(async (req, res, next) => {
  //send refreshtoken here and receive new access and refresh tokens
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  //verify and decode the token

  const token = jwt.verify(
    refreshToken,
    process.env.REFRESH_SECRET,
    (err, decode) => {
      if (err) {
        throw new MyError("wrong refresh token", 400);
      }

      return decode;
    }
  );
  console.log(token);

  //find the user

  const theUser = await User.findById({ _id: token.id });

  res.status(200).json({
    success: true,
    accessToken: theUser.getJWT(),
    refreshToken: theUser.getRefresh(),
  });
});
