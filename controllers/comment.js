const Comment = require("../models/comment");
const Expense = require("../models/expense");
const { commentSchema } = require("../models/validation/schema");

exports.getComments = async (req, res, next) => {
  try {
    let expenses = [];

    const { expense: expenseId } = req.query;

    if (expenseId) {
      const expense = req.user.expenses.find((e) => e.id == expenseId);
      const comments = await expense.getComments({
        attributes: ["id", "text", "createdAt", "updatedAt"],
      });

      return res.json(comments);
    }

    for (let expense of req.user.expenses) {
      const comments = await expense.getComments();
      expenses.push({
        expense: {
          id: expense.id,
          name: expense.name,
        },
        comments: comments,
      });
    }

    res.json(expenses);
  } catch (err) {
    next(err);
  }
};

exports.getComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id, {
      include: [
        {
          model: Expense,
          attributes: ["id", "name"],
        },
      ],
    });

    res.json(comment);
  } catch (err) {
    next(err);
  }
};

exports.createComment = async (req, res, next) => {
  try {
    const { expenseId } = req.params;

    const result = await commentSchema.validateAsync({
      text: req.body.text,
    });

    const expense = req.user.expenses.find((e) => e.id == expenseId);

    console.log(result);

    const comment = await expense.createComment({
      text: result.text,
    });

    res.status(201).json(comment);
  } catch (err) {
    next(err);
  }
};

exports.updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await commentSchema.validateAsync(req.body);

    const comment = await Comment.findByPk(id);

    comment.text = result.text;
    await comment.save();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Comment.destroy({
      where: {
        id: id,
      },
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
