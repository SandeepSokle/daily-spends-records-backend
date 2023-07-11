const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    spendFor: {
      type: String,
      required: true,
    },
    spendBy: {
      type: String,
      required: true,
      unique: false,
    },
    amount: {
      type: Number,
      required: true,
      default: 0,
    },
    date: {
      type: String,
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
