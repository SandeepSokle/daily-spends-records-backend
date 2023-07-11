const express = require("express");
const {
  getUsers,
  signUpUser,
  loginUser,
} = require("../controller/usersController");
const { userAuthentication } = require("../middlewares/userMiddleware");
const userRouter = express.Router();

userRouter.get("/", userAuthentication, getUsers);
userRouter.post("/signup", signUpUser);
userRouter.post("/login", loginUser);

module.exports = userRouter;
