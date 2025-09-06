const dotenv = require("dotenv");
dotenv.config();

require("./config/db.js");

const express = require("express");
const cookieparser = require("cookie-parser");
const { apiRouter } = require("./api/routes.js");

const app = express();

app.use(express.json());
app.use(cookieparser());

app.use("/api", apiRouter);

module.exports = { app };
