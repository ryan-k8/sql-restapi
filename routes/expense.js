const express = require("express");

const router = express.Router();

const expenseController = require("../controllers/expense");
const jwtAuth = require("../middlewares/jwt-auth");
const expensePerms = require("../middlewares/perm/expense");
const permAuth = require("../middlewares/permAuth");

router.get("/", jwtAuth, expenseController.getExpenses);
router.get(
  "/:id",
  jwtAuth,
  permAuth(expensePerms),
  expenseController.getExpense
);
router.post("/", jwtAuth, expenseController.createExpense);
router.put(
  "/:id",
  jwtAuth,
  permAuth(expensePerms),
  expenseController.updateExpense
);
router.delete(
  "/:id",
  jwtAuth,
  permAuth(expensePerms),
  expenseController.deleteExpense
);

module.exports = router;
