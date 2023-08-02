const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: false,
    },
    phone: {
      type: Number,
      required: true,
      default: 0,
      unique: false,
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
      unique: false,
    },
    address: {
      type: String,
      required: true,
      default: "Jind",
      unique: false,
    },
    token: {
      type: String,
      default: "12345",
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("users", UserSchema);

module.exports = userModel;
