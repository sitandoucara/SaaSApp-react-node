const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

// Routes
const authRoutes = require("./routes/authRoutes");
const contactRoutes = require("./routes/contactRoutes");
const newsRoutes = require("./routes/newsRoutes");
const stripeRoutes = require("./routes/stripeRoutes");
const adminRoutes = require("./routes/adminRoutes");

app.use("/auth", authRoutes);
app.use("/contact", contactRoutes);
app.use("/news", newsRoutes);
app.use("/stripe", stripeRoutes);
app.use("/admin", adminRoutes);

module.exports = app;
