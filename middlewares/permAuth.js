const { ExpressError } = require("../util/err");

module.exports = (permission) => {
  return async (req, res, next) => {
    try {
      const [err, allowed] = await permission({
        user: req.user,
        params: req.params,
      });

      if (err) {
        next(err);
      }

      if (!allowed) {
        next(new ExpressError("forbidden", 403));
      }

      next();
    } catch (err) {
      console.log(err);
    }
  };
};
