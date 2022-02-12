const Sequelize = require("sequelize");

const { sequelize } = require("../util/db");

const Expense = sequelize.define("expense", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  amount: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Expense;
