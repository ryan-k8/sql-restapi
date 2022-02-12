const Sequelize = require("sequelize");

const { sequelize } = require("../util/db");

const Comment = sequelize.define("comment", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },

  text: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Comment;
