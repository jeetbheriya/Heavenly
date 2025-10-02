const express = require("express");
const router = express.Router();
const wrapasync = require("../utils/wrapasync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/user.js");

router.route("/signup")
  .get(userController.renderSignupForm)
  .post(wrapasync(userController.signUp));

router.route("/login")
  .get(userController.renderLoginForm)
  .post(saveRedirectUrl, passport.authenticate("local", {failureRedirect: '/login', failureFlash: true}), userController.logIn );

router.get("/logout", userController.logOut);

module.exports = router;
