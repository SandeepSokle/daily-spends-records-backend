const express = require("express");
const { getUsers, signUpUser, loginUser } = require("../controller/usersController");
const userRouter = express.Router();

userRouter.get("/", getUsers);
userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
