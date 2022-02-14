const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");
const commentController = require("../controllers/comment");
const commentPerms = require("../middlewares/perm/comment");
const permAuth = require("../middlewares/permAuth");

router.get("/", jwtAuth, commentController.getComments);
router.get(
  "/:id",
  jwtAuth,
  permAuth(commentPerms),
  commentController.getComment
);
router.post("/:expenseId", jwtAuth, commentController.createComment);
router.put(
  "/:id",
  jwtAuth,
  permAuth(commentPerms),
  commentController.updateComment
);
router.delete(
  "/:id",
  jwtAuth,
  permAuth(commentPerms),
  commentController.deleteComment
);

module.exports = router;
