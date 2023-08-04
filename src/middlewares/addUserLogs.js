var jwt = require("jsonwebtoken");
const historyModel = require("../Models/historyModel");

const addUserLogs = async (req, res, next) => {
  try {
    //add logs of users
    await historyModel.create({
      spendBy: req.body.spendBy,
      spendFor: req.body.spendFor,
      amount: req.body.amount,
      user: req.user._id,
      date: new Date(),
      status:
        req.url === "/edit_record"
          ? "Modify"
          : req.url === "/add_record"
          ? "Insert"
          : "Delete",
    });

    next();
  } catch (err) {
    res.status(400).send({
      status: false,
      msg: "Logs Not Added!",
      err,
    });
  }
};

module.exports = {
  addUserLogs,
};
