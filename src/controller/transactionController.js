const moment = require("moment/moment");
const transactionModel = require("../Models/transactionModel");
const historyModel = require("../Models/historyModel");

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
  const { user, id } = req.query;

  try {
    let record;
    if (id) {
      record = await transactionModel.findOne({
        _id: id,
      });
    } else {
      record = await transactionModel
        .find({
          user,
        })
        .sort({
          createdAt: -1,
        });
    }

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

const getRecordsMonthly = async (req, res, next) => {
  const { user } = req.query;

  try {
    const record = await transactionModel.aggregate([
      {
        $match: {
          $expr: { $eq: ["$user", { $toObjectId: user }] },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$date" },
            year: { $year: "$date" },
            expenseType: "$expenceCategories",
          },

          totalAmount: {
            $sum: "$amount",
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
            month: "$_id.month",
          },
          expenses: {
            $push: {
              expenseType: "$_id.expenseType",
              totalAmount: "$totalAmount",
            },
          },
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);
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

const getRecordsYearly = async (req, res, next) => {
  const { user } = req.query;

  try {
    const record = await transactionModel.aggregate([
      {
        $match: {
          $expr: { $eq: ["$user", { $toObjectId: user }] },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            expenseType: "$expenceCategories",
          },

          totalAmount: {
            $sum: "$amount",
          },
        },
      },
      {
        $group: {
          _id: {
            year: "$_id.year",
          },
          expenses: {
            $push: {
              expenseType: "$_id.expenseType",
              totalAmount: "$totalAmount",
            },
          },
          total: {
            $sum: "$totalAmount",
          },
        },
      },
    ]);
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

const getActivityLogs = async (req, res, next) => {
  const { user } = req.query;

  try {
    let activityLogs = await historyModel
      .find({
        user,
      })
      .limit(1000)
      .sort({
        createdAt: -1,
      });

    res.status(200).send({
      msg: "Found Successfully!",
      count: activityLogs.length,
      activityLogs,
    });
  } catch (err) {
    res.status(400).send({
      msg: "Not Found!",
      err,
    });
  }
};

// const exportAllMemberModel = asyncHandler(async (req, res, next) => {
//   let data = await MemberModel.find().lean();
//   const csvFields = Object.keys(data[0]);
//   const json2csvParser = new Json2csvParser({ csvFields });
//   const csv = json2csvParser.parse(data);
//   res.set("Content-Disposition", "attachment;filename=authors.csv");
//   res.set("Content-Type", "application/octet-stream");
//   res.send(csv);
// });

module.exports = {
  addRecords,
  editRecords,
  getRecords,
  deleteRecords,
  getRecordsMonthly,
  getRecordsYearly,
  getActivityLogs,
};
