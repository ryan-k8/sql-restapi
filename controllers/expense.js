const expense = require("../middlewares/perm/expense");
const Category = require("../models/category");
const Expense = require("../models/expense");

const { expenseSchema } = require("../models/validation/schema");
const { ExpressError } = require("../util/err");

exports.getExpenses = async (req, res, next) => {
  try {
    const expenseIds = req.user.expenses.map((e) => e.id);
    const expenses = await Expense.findAll({
      where: {
        id: [...expenseIds],
      },
      attributes: ["id", "name", "amount"],
      include: {
        model: Category,
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
    });

    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

exports.getExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByPk(id, {
      attributes: ["id", "name", "amount", "userId", ["createdAt", "date"]],
      include: [
        {
          model: Category,
          attributes: ["id", "name"],
          through: { attributes: [] },
        },
      ],
    });

    if (!expense) {
      return res.json([]);
    }

    if (expense.userId !== req.user.id) {
      throw new ExpressError("forbidden", 403);
    }

    res.json(expense);
  } catch (err) {
    next(err);
  }
};

exports.createExpense = async (req, res, next) => {
  try {
    const result = await expenseSchema.validateAsync({
      name: req.body.name,
      amount: req.body.amount,
      categories: JSON.parse(req.body.categories),
    });

    const expense = await req.user.createExpense(result);

    const categories = req.user.categories.filter((category) => {
      return result.categories.includes(category.name);
    });

    await expense.addCategories(...categories);

    res.status(201).json(expense);
  } catch (err) {
    next(err);
  }
};

exports.updateExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await expenseSchema.validateAsync({
      name: req.body.name,
      amount: req.body.amount,
      categories: JSON.parse(req.body.categories),
    });

    const expense = req.user.expenses.find((expense) => expense.id == id);

    expense.name = result.name;
    expense.amount = result.amount;

    const updatedCategories = await req.user.categories.filter((category) => {
      return result.categories.includes(category.name);
    });

    await expense.addCategories(...updatedCategories);
    await expense.save();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deleteExpense = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Expense.destroy({
      where: {
        id: id,
      },
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
