const mongoose = require("mongoose");

const bcrypt = require('bcryptjs');

const validator = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    validate: {
      validator: function (value) {
        return /^[a-zA-Z0-9_]+$/.test(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    validate(val) {
      if (validator.isStrongPassword(val)) {
      }
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();
  delete userObj.password;

  return userObj;
};


userSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassowrd
  ) {
    return await bcrypt.compare(
      candidatePassword,
      userPassowrd
    );
  };
const User = mongoose.model("User", userSchema);

module.exports = User;
