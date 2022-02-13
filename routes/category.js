const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.post("/", jwtAuth, categoryController.createCategory);
router.put("/:id", jwtAuth, categoryController.updateCategory);
router.delete("/:id", jwtAuth, categoryController.deleteCategory);

module.exports = router;
