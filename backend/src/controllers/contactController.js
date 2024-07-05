const { mailPattern } = require("../utils/validators");
const emailService = require("../services/emailService");

exports.contact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!mailPattern.test(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  if (message.length < 50) {
    return res
      .status(400)
      .json({ error: "Message must be at least 50 characters long" });
  }

  try {
    await emailService.sendEmail({ name, email, subject, message });
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "An error occurred while sending the email" });
  }
};
