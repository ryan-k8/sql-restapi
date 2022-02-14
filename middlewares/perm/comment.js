const Comment = require("../../models/comment");
const Expense = require("../../models/expense");
const { ExpressError } = require("../../util/err");

module.exports = async ({ user, params }) => {
  try {
    const comment = await Comment.findByPk(params.id, {
      include: Expense,
    });

    if (!comment) {
      return [new ExpressError("no comment found", 404), null];
    }

    const isUserComment = user.expenses.find((expense) => {
      return expense.id == comment.expense.id;
    });

    if (!isUserComment) {
      return [null, false];
    }

    return [null, true];
  } catch (err) {
    return [err, null];
  }
};
