const jwt = require("jsonwebtoken");

const { ExpressError } = require("./err");

module.exports = {
  signToken: (email, duration) => {
    return new Promise((resolve, reject) => {
      jwt.sign(
        { id: email },
        process.env.JWT_SECRET,
        {
          expiresIn: duration,
          audience: email,
        },
        (err, token) => {
          if (err) {
            reject(err);
          }

          resolve(token);
        }
      );
    });
  },

  verifyToken: async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
          const errmsg =
            err.name === "JsonWebTokenError" ? "unauthorized" : err.message;
          reject(new ExpressError(errmsg, 401));
        }
        resolve(decoded);
      });
    });
  },
};
