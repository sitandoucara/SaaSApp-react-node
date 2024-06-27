console.log("okkk");
const app = require("./src/app");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET;
require("dotenv").config();
console.log("Database URL:", process.env.DATABASE_URL);

const PORT = process.env.PORT;

const mailPattern =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

function generateToken(user) {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: "1h",
  });
}

function authenticateToken(req, res, next) {
  const token =
    req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  if (!token)
    return res.status(401).json({ error: "Access denied, no token provided" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

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
    const token = generateToken(user);
    res.status(200).json({ message: "Signin successful", user, token });
  } catch (error) {
    console.error("Error signing in user:", error);
    res
      .status(500)
      .json({ error: "An error occurred while signing in the user" });
  }
});

app.post("/contact", async (req, res) => {
  const { name, email, subject, message } = req.body;
  console.log("Contact request received:", req.body);

  if (!mailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (message.length < 50) {
    return res
      .status(400)
      .json({ error: "Message must be at least 50 characters long" });
  }

  try {
    const mailOptions = {
      from: email,
      to: "doucarasitan@gmail.com",
      subject: `Contact Form Submission: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent:", mailOptions);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
});

app.listen(PORT, () => console.log(`Application launched on port ${PORT} !!!`));
