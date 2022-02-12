const Sequelize = require("sequelize");

const { sequelize } = require("../util/db");

const Category = sequelize.define("category", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  limits: {
    type: Sequelize.JSON,
    allowNull: false,
  },
});

module.exports = Category;
