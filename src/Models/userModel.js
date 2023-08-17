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
    expenceCategories: {
      type: [String],
      required: false,
      default: [
        "Rent or mortgage payment",
        "Internet and cable bills",
        "Home maintenance",
        "Fuel or public transportation costs",
        "Food Expenses",
        "Personal Care",
        "Entertainment and Recreation Expenses",
        "Savings and Investments",
        "Childcare and Family Expenses",
      ],
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
