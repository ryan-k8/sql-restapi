const express = require("express");

const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const User = require("./models/user");
const Category = require("./models/category");
const Expense = require("./models/expense");
const Comment = require("./models/comment");
const CategoryItem = require("./models/categoryItem");

/** @Associations */

User.hasMany(Category);
Category.belongsTo(User, { onDelete: "CASCADE" });

Category.hasMany(Expense);
Expense.belongsToMany(Category, { through: CategoryItem });
Category.belongsToMany(Expense, { through: CategoryItem });

Expense.hasMany(Comment);
Comment.belongsTo(Expense, { constraints: true, onDelete: "CASCADE" });

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
