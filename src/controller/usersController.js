const users = require("../Models/userModel");

const getUsers = async (req, res, next) => {
  // console.log(req.body);
  try {
    res.status(200).send({
      msg: "send Successfully!",
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  getUsers,
};
