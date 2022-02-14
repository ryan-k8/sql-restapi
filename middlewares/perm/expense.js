const Expense = require("../../models/expense");
const { ExpressError } = require("../../util/err");

module.exports = async ({ user, params }) => {
  try {
    const expense = await Expense.findByPk(params.id);

    if (!expense) {
      return [new ExpressError("no expense found", 404), null];
    }

    const isUserExpense = user.expenses.find((expense) => {
      return expense.id == params.id;
    });

    if (!isUserExpense) {
      return [null, false];
    }

    return [null, true];
  } catch (err) {
    return [err, null];
  }
};
