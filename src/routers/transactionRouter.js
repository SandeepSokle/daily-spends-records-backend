const express = require("express");
const { addRecords } = require("../controller/transactionController");
const transactionRouter = express.Router();

transactionRouter.post("/add_record", addRecords);

module.exports = transactionRouter;
