const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");
const categoryController = require("../controllers/category");

router.get("/", jwtAuth, categoryController.getCategories);
router.get("/:id", jwtAuth, categoryController.getCategory);
router.post("/", jwtAuth, categoryController.createCategory);
router.put("/:id", jwtAuth, categoryController.updateCategory);
router.delete("/:id", jwtAuth, categoryController.deleteCategory);

module.exports = router;
