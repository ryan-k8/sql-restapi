const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");

router.get("/", jwtAuth, expenseController.getExpenses);
router.get("/:id", jwtAuth, expenseController.getExpense);
router.post("/", jwtAuth, expenseController.createExpense);
router.put("/:id", jwtAuth, expenseController.updateExpense);
router.delete("/:id", jwtAuth, expenseController.deleteExpense);

module.exports = router;
