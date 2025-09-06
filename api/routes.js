const express = require("express");
const { authRouter } = require("./auth/auth.routes");
const { userAuthenticationMiddleware } = require("./middleware");
const { patientRouter } = require("./patients/routes");
const { doctorRouter } = require("./doctor/routes");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);

apiRouter.use(userAuthenticationMiddleware);

apiRouter.use("/patients", patientRouter);

apiRouter.use("/doctors", doctorRouter);

module.exports = { apiRouter };
