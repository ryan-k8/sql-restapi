const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");

router.get("/", jwtAuth, commentController.getComments);
router.get("/:id", jwtAuth, commentController.getComment);
router.post("/", jwtAuth, commentController.createComment);
router.put("/:id", jwtAuth, commentController.updateComment);
router.delete("/:id", jwtAuth, commentController.deleteComment);

module.exports = router;
