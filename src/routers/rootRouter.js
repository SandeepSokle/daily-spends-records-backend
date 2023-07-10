const express = require("express");
const rootRouter = express.Router();
const userRouter = require("./userRouter");

rootRouter.use("/user", userRouter);

module.exports = rootRouter;
