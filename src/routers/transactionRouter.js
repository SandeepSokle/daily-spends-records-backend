const express = require("express");
const {
  addRecords,
  editRecords,
  getRecords,
  deleteRecords,
  getRecordsMonthly,
  getRecordsYearly,
} = require("../controller/transactionController");
const transactionRouter = express.Router();

transactionRouter.post("/add_record", addRecords);
transactionRouter.post("/edit_record", editRecords);
transactionRouter.delete("/delete_record", deleteRecords);
transactionRouter.get("/get_record", getRecords);
transactionRouter.get("/get_record/monthly", getRecordsMonthly);
transactionRouter.get("/get_record/yearly", getRecordsYearly);

module.exports = transactionRouter;
