const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const admin = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    trim: true,
  },
});

admin.pre("save", async function () {
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
});
admin.methods.getJWT = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.ADMIN_JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
  return token;
};
admin.methods.getRefresh = function () {
  const token = jwt.sign(
    {
      id: this._id,
    },
    process.env.ADMIN_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_EXPIRE,
    }
  );
  return token;
};
admin.methods.passwordChecker = async function (pass) {
  return await bcrypt.compare(pass, this.password);
};

module.exports = mongoose.model("admin", admin);
