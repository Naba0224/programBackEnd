const asyncHandler = require("../../middleware/asyncHandler");
const MyError = require("../../utility/myError");
const Admin = require("../../models/admin");
exports.createAdmin = asyncHandler(async (req, res, next) => {
  //secret end point
  const creation = await Admin.create({
    username: "admin",
    password: "pass123$",
  });
  res.status(200).json({
    success: true,
    data: creation,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;

  //   console.log(username, password);
  //check if the admin exists or not

  const theAdmin = await Admin.findOne({ username: username });
  if (!theAdmin) {
    throw new MyError("wrong username or password", 400);
  }
  //check the password
  const passCheck = await theAdmin.passwordChecker(password);
  console.log(passCheck);
  if (!passCheck) {
    throw new MyError("worng username or password", 400);
  }

  res.status(200).json({
    success: true,
    accessToken: theAdmin.getJWT(),
    refreshToken: theAdmin.getRefresh(),
  });
});
