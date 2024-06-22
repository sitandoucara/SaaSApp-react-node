const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const newsRoutes = require("./routes/newsRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use("/news", newsRoutes);

module.exports = app;
