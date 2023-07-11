const express = require("express");
const rootRouter = express.Router();
const userRouter = require("./userRouter");
const transactionRouter = require("./transactionRouter");
const { userAuthentication } = require("../middlewares/userMiddleware");

rootRouter.use("/user", userRouter);
rootRouter.use("/transaction", userAuthentication, transactionRouter);

module.exports = rootRouter;
