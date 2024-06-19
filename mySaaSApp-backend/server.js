console.log("okkk");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const helmet = require("helmet");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
require("dotenv").config();
console.log("Database URL:", process.env.DATABASE_URL);

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());

const mailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

app.post("/auth/signup", async (req, res) => {
  const { email, name, password } = req.body;
  console.log("Signup request received:", req.body);

  if (!mailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (!passwordPattern.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });
    console.log("New user created:", newUser);
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
});

app.post("/auth/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("Signin request received:", req.body);

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    res.status(200).json({ message: "Signin successful", user });
  } catch (error) {
    console.error("Error signing in user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while signing in the user" });
  }
});

app.listen(PORT, () => console.log(`Application launched on port ${PORT} !!!`));
