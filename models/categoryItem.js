const Sequelize = require("sequelize");

const { sequelize } = require("../util/db");

/**@junctionTable b/w categories and expenses */
const CategoryItem = sequelize.define("categoryItem", {
  id: {
    type: Sequelize.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
});

module.exports = CategoryItem;
