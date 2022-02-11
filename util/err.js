class ExpressError extends Error {
  constructor(message, statusCode) {
    super(message);

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = { ExpressError };
