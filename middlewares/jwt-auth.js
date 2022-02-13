const { ExpressError } = require("../util/err");
const { verifyToken } = require("../util/jwt");

module.exports = async (req, res, next) => {
  try {
    if (!req.headers["Authorization"]) {
      throw new ExpressError("unauthorized", 401);
    }

    const tokenType = req.headers["Authorization"].split(" ")[0];

    if (tokenType != "Bearer") {
      throw new ExpressError("Bad Request", 400);
    }

    const token = req.headers["Authorization"].split(" ")[1];

    const { id } = await verifyToken(token);

    req.user = { id: id };

    next();
  } catch (err) {
    next(err);
  }
};
