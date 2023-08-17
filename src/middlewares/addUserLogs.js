var jwt = require("jsonwebtoken");
const historyModel = require("../Models/historyModel");
const userModel = require("../Models/userModel");
const { default: mongoose } = require("mongoose");

const addUserLogs = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    //add logs of users
    let userData = await userModel.findOne({
      $and: [
        { _id: req.user._id },
        {
          expenceCategories: {
            $in: [req.body.expenceCategories],
          },
        },
      ],
    });

    if (!userData) {
       userData = await userModel.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            expenceCategories: req.body.expenceCategories,
          },
        },
        {
          new: true,
          session,
        }
      );
    }

    await historyModel.create(
      [
        {
          spendBy: req.body.spendBy,
          spendFor: req.body.spendFor,
          amount: req.body.amount,
          expenceCategories: req.body.expenceCategories,
          user: req.user._id,
          date: new Date(),
          status:
            req.url === "/edit_record"
              ? "Modify"
              : req.url === "/add_record"
              ? "Insert"
              : "Delete",
        },
      ],
      {
        session,
      }
    );

    await session.commitTransaction();
    session.endSession();

    next();
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
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
