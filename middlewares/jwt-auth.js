const { ExpressError } = require("../util/err");
const { verifyToken } = require("../util/jwt");

const User = require("../models/user");
const Category = require("../models/category");
const Expense = require("../models/expense");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers["authorization"]) {
      throw new ExpressError("unauthorized", 401);
    }
    const bearerToken = req.headers["authorization"].split(" ");
    const token = bearerToken[1];

    const { id: userEmail } = await verifyToken(token);

    req.user = await User.findOne({
      where: {
        email: userEmail,
      },
      include: [Category, Expense],
    });

    next();
  } catch (err) {
    next(err);
  }
};
