const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
      unique: false,
    },
    spendBy: {
      type: String,
      required: true,
      unique: false,
    },
    expenceCategories: {
      type: String,
      required: true,
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
    status: {
      type: String,
      required: true,
      default: "Insert",
      enum: ["Insert", "Modify", "Delete"],
    },
  },
  {
    timestamps: true,
  }
);

const historyModel = mongoose.model("activityLogs", historySchema);

module.exports = historyModel;
