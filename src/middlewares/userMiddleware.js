var jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const userAuthentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res
      .status(401)
      .json({ success: false, message: "Provide Authorization" });
  jwt.verify(token, "sokle", async (err, user) => {
    if (err) {
      return res.status(403).json({
        success: false,
        message: "Authorization token is Invalid",
        error: err,
      });
    }
    user = await userModel.findOne({
      _id: user._id,
    });
    req.user = user;
    next();
  });
};

module.exports = {
  userAuthentication,
};
