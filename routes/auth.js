const express = require("express");

const router = express.Router();

const authController = require("../controllers/auth");

router.get("/google-login", authController.redirect2Login);
router.get("/google", authController.handleOauth2Login);
router.get("/me", authController.generateAccessToken);
module.exports = router;
