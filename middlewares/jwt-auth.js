const { ExpressError } = require("../util/err");
const { verifyToken } = require("../util/jwt");

const User = require("../models/user");

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
    });

    next();
  } catch (err) {
    next(err);
  }
};
