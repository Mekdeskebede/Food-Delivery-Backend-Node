const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "kebedemekdes289@gmail.com",
    pass: process.env.EMAIL_PASSWORD,
  },
});

module.exports = transporter;
