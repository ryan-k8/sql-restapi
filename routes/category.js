const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");
const categoryController = require("../controllers/category");
const permAuth = require("../middlewares/permAuth");
const categoryPerms = require("../middlewares/perm/category");

router.get("/", jwtAuth, categoryController.getCategories);
router.get(
  "/:id",
  jwtAuth,
  permAuth(categoryPerms),
  categoryController.getCategory
);
router.post("/", jwtAuth, categoryController.createCategory);
router.put(
  "/:id",
  jwtAuth,
  permAuth(categoryPerms),
  categoryController.updateCategory
);
router.delete(
  "/:id",
  jwtAuth,
  permAuth(categoryPerms),
  categoryController.deleteCategory
);

module.exports = router;
