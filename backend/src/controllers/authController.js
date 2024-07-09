const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { mailPattern, passwordPattern } = require("../utils/validators");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET
  );
}

exports.signup = async (req, res) => {
  const { email, name, password } = req.body;

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
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email already in use!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'user dans la base do
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        role: "user",
      },
    });

    const token = generateToken(newUser);
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while creating the user" });
  }
};

exports.signin = async (req, res) => {
  const { email, password } = req.body;

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

    const token = generateToken(user);
    res.status(200).json({ message: "Signin successful", user, token });
  } catch (error) {
    console.error("Error signing in user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while signing in the user" });
  }
};

exports.deleteAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    await prisma.user.delete({
      where: { id: userId },
    });
    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error("Error deleting account:", error);
    res
      .status(500)
      .json({ error: "An error occurred while deleting the account" });
  }
};

exports.updateName = async (req, res) => {
  const { userId, newName } = req.body;

  try {
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name: newName },
    });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user name:", error);
    res
      .status(500)
      .json({ error: "An error occurred while updating user name" });
  }
};
