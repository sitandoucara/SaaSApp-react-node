const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const newsRoutes = require("./routes/newsRoutes");
require("dotenv").config();

const app = express();

app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

app.use("/news", newsRoutes);

module.exports = app;
