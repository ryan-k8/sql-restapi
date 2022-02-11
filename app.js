const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth");
const errhandler = require("./middlewares/errhandler");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/auth", authRoutes);

app.use("/", (req, res, next) => {
  res.status(404).json({
    message: "not found",
  });
});

app.use(errhandler);

module.exports = app;
