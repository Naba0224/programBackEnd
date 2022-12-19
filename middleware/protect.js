const MyError = require("../utility/myError");
const jwt = require("jsonwebtoken");

exports.protect = (req, res, next) => {
  if (!req.headers.authorization) {
    //throw error if autho doesn't exist
    throw new MyError("not authorized", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  console.log("middeware");
  console.log(token);
  if (!token) {
    //throw error if token doesn't exist in Bearer token format
    throw new MyError("no token", 401);
  }

  //verify the token

  jwt.verify(token, process.env.JWT_SECRET, (err) => {
    if (err) {
      throw new MyError("wrong token", 401);
    }
    next();
  });
};
exports.protectAdmin = (req, res, next) => {
  if (!req.headers.authorization) {
    //throw error if autho doesn't exist
    throw new MyError("not authorized", 401);
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    //throw error if token doesn't exist in Bearer token format
    throw new MyError("no token", 401);
  }

  //verify the token

  jwt.verify(token, process.env.ADMIN_JWT_SECRET, (err) => {
    if (err) {
      throw new MyError("wrong token", 401);
    }
    next();
  });
};
