const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      default: "12345",
    },
    token: {
      type: String,
      default: "12345",
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
