const express = require("express");

const router = express.Router();

const jwtAuth = require("../middlewares/jwt-auth");
const authController = require("../controllers/auth");

router.get("/google-login", authController.redirect2Login);
router.get("/google", authController.handleOauth2Login);
router.get("/me", authController.generateAccessToken);

router.get("/test", jwtAuth, async (req, res, next) => {
  try {
    console.log(req.user);
    res.send(req.user);
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
