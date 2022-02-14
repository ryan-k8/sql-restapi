const Category = require("../../models/category");
const { ExpressError } = require("../../util/err");

module.exports = async ({ user, params }) => {
  try {
    const category = await Category.findByPk(params.id);

    if (!category) {
      return [new ExpressError("no category found", 404), null];
    }

    const isUserCategory = user.categories.find((category) => {
      return category.id == params.id;
    });

    if (!isUserCategory) {
      return [null, false];
    }

    return [null, true];
  } catch (err) {
    return [err, null];
  }
};
