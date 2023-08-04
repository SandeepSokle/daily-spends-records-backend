const express = require("express");
const {
  addRecords,
  editRecords,
  getRecords,
  deleteRecords,
  getRecordsMonthly,
  getRecordsYearly,
  getActivityLogs,
} = require("../controller/transactionController");
const { addUserLogs } = require("../middlewares/addUserLogs");
const transactionRouter = express.Router();

transactionRouter.post("/add_record", addUserLogs, addRecords);
transactionRouter.post("/edit_record", addUserLogs, editRecords);
transactionRouter.post("/delete_record", addUserLogs, deleteRecords);
transactionRouter.get("/get_record", getRecords);
transactionRouter.get("/get_record/monthly", getRecordsMonthly);
transactionRouter.get("/get_record/yearly", getRecordsYearly);
transactionRouter.get("/get_activity_logs", getActivityLogs);

module.exports = transactionRouter;
