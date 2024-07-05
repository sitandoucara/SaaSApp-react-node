const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS,
  },
});

exports.sendEmail = async ({ name, email, subject, message }) => {
  const mailOptions = {
    from: email,
    to: "doucarasitan@gmail.com",
    subject: `Contact Form Submission: ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  await transporter.sendMail(mailOptions);
};
