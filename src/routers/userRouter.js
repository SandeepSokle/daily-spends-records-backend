const express = require("express");
const { getUsers } = require("../controller/usersController");
const userRouter = express.Router();

userRouter.get("/", getUsers);

module.exports = userRouter;
