require("dotenv").config();
require("./database/client");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const trainerRouter = require("./routes/trainerRouter");
const teamRouter = require("./routes/teamRouter");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/trainers", trainerRouter);
app.use("/teams", teamRouter);

module.exports = app;
