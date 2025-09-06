const express = require("express");
const { userSignupValidator, userLoginValidator } = require("./auth.dto");
const {
  userSignupController,
  userLoginController,
  userLogoutcontroller,
} = require("./auth.controller");

const authRouter = express.Router();

authRouter.post("/register", userSignupValidator, userSignupController);
authRouter.post("/login", userLoginValidator, userLoginController);
authRouter.post("/logout", userLogoutcontroller);

module.exports = { authRouter };
