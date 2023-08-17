const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    spendBy: {
      type: String,
      required: true,
      unique: false,
    },
    expenceCategories: {
      type: String,
      required: false,
      unique: false,
    },
    spendFor: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: Date,
      required: false,
      default: new Date(),
    },
  },
  {
    timestamps: true,
  }
);

const transactionModel = mongoose.model("transaction", transactionSchema);

module.exports = transactionModel;
