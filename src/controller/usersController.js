const userModel = require("../Models/userModel");
const users = require("../Models/userModel");
const bcrypt = require("bcrypt");
const saltRounds = 10;
var jwt = require("jsonwebtoken");

const getUsers = async (req, res, next) => {
  try {
    res.status(200).send({
      msg: "send Successfully!",
      user: req.user,
    });
  } catch (err) {
    res.status(400).send({
      msg: "send failed!",
    });
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
    let token = jwt.sign(
      { name, email, phone, _id: user._id, address: user.address },
      "sokle"
    );

    res.status(200).send({
      msg: "send Successfully!",
      token: token,
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({
      email,
    });
    if (!user) throw "User Not exist!";
    if (user.password != password) throw "Wrong password!";
    let token = jwt.sign(
      {
        name: user.name,
        email: user.email,
        phone: user.phone,
        _id: user._id,
        address: user.address,
      },
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
