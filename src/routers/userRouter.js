const express = require("express");
const {
  getUsers,
  signUpUser,
  loginUser,
} = require("../controller/usersController");
const { userAuthentication } = require("../middlewares/userMiddleware");
const userRouter = express.Router();

userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser);
userRouter.get("/", userAuthentication, getUsers);

module.exports = userRouter;
