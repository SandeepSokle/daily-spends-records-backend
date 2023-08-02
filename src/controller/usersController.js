const userModel = require("../Models/userModel");
const users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  // console.log(req.body);
  try {
    res.status(200).send({
      msg: "send Successfully!",
      user: req.user,
    });
  } catch (err) {
    console.log(err.message);
  }
};

const signUpUser = async (req, res, next) => {
  const { name, email, phone, address, password } = req.body;
  try {
    let user = await userModel.create({
      name,
      email,
      phone,
      address,
      password,
    });
    let token = jwt.sign({ name, email, phone, _id: user._id }, "sokle");

    res.status(200).send({
      msg: "send Successfully!",
      token: token,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  console.log({ email, password });
  try {
    const user = await userModel.findOne({
      email,
    });
    if (!user) throw "User Not exist!";
    if (user.password != password) throw "Wrong password!";
    let token = jwt.sign(
      { name: user.name, email: user.email, phone: user.phone, _id: user._id },
      "sokle"
    );
    res.status(200).send({
      msg: "login Successfully!",
      token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getUsers,
  signUpUser,
  loginUser,
};
