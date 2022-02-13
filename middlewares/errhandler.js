const { ExpressError } = require("../util/err");

module.exports = async (err, req, res, next) => {
  try {
    if (err instanceof ExpressError) {
      return res.status(err.statusCode).json({
        error: {
          detail: err.message,
        },
      });
    }
    if (err.isJoi === true) {
      return res.status(422).json({
        error: {
          detail: err.message,
        },
      });
    }

    res.status(500).json({
      error: {
        detail: "internal server error",
      },
    });
    console.log(err);
  } catch (err) {
    console.log(err);
  }
};
