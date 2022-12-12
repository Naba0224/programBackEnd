const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const user = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
  },
});

user.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});
user.methods.getJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return token;
};
user.methods.getRefresh = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRE,
    }
  );
  return token;
};
user.methods.passwordChecker = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("user", user);
