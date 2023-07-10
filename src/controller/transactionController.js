const transactionModel = require("../Models/transactionModel");

const addRecords = async (req, res, next) => {
  console.log(req.body);
  try {
    let record = await transactionModel.create({
      ...req.body,
    });

    res.status(200).send({
      msg: "send Successfully!",
      record,
    });
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  addRecords,
};
