const Category = require("../models/category");

const { ExpressError } = require("../util/err");
const { categorySchema } = require("../models/validation/schema");

exports.getCategories = async (req, res, next) => {
  try {
    const userCategories = await req.user.getCategories({
      attributes: ["id", "name", "limits", ["createdAt", "date"]],
    });

    res.status(200).json(userCategories);
  } catch (err) {
    next(err);
  }
};

exports.getCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = await Category.findByPk(id);

    if (!category) {
      return res.json([]);
    }

    res.status(200).json(category);
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const result = await categorySchema.validateAsync({
      name: req.body.name,
      limits: JSON.parse(req.body.limits),
    });

    const alreadyExists = await Category.findOne({
      where: {
        name: result.name.toLowerCase(),
      },
    });

    if (alreadyExists) {
      throw new ExpressError("category already exists", 409);
    }

    const category = await req.user.createCategory(result);

    res.status(201).json(category);
  } catch (err) {
    next(err);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await categorySchema.validateAsync({
      name: req.body.name,
      limits: JSON.parse(req.body.limits),
    });

    const category = await Category.findByPk(id);

    category.name = result.name;
    category.limits = result.limits;
    await category.save();

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};

exports.deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Category.destroy({
      where: {
        id: id,
      },
    });

    res.sendStatus(200);
  } catch (err) {
    next(err);
  }
};
