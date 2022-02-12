const Sequelize = require("sequelize");

const { sequelize } = require("../util/db");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  profileImage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = User;
