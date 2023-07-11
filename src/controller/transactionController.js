const transactionModel = require("../Models/transactionModel");

const addRecords = async (req, res, next) => {
  try {
    let record = await transactionModel.create({
      ...req.body,
      user: req.user._id,
    });

    res.status(200).send({
      msg: "Add Successfully!",
      record,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Addtion Failed!",
      err,
    });
  }
};

const editRecords = async (req, res, next) => {
  try {
    let record = await transactionModel.findOneAndUpdate(
      {
        _id: req.body._id,
      },
      {
        ...req.body,
      },
      {
        new: true,
      }
    );

    res.status(200).send({
      msg: "Edit Successfully!",
      record,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Edit failed!",
      err,
    });
  }
};

const getRecords = async (req, res, next) => {
  const { user } = req.query;

  try {
    let record = await transactionModel.find({
      user,
    });

    res.status(200).send({
      msg: "Found Successfully!",
      count: record.length,
      record,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Not Found!",
      err,
    });
  }
};

const deleteRecords = async (req, res, next) => {
  const { id } = req.query;
  try {
    let record = await transactionModel.findOneAndRemove({
      _id: id,
    });

    res.status(200).send({
      msg: "Deleted!",
      record,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Deletion failed!",
      err,
    });
  }
};

module.exports = {
  addRecords,
  editRecords,
  getRecords,
  deleteRecords
};
