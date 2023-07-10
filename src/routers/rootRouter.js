const express = require("express");
const rootRouter = express.Router();
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");

rootRouter.use("/user", userRouter);
rootRouter.use("/transaction", transactionRouter);

module.exports = rootRouter;
