const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASS, META_NET_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: {
    user: META_NET_EMAIL,
    pass: META_PASS,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: META_NET_EMAIL };
  return transport.sendMail(email);
};

module.exports = sendEmail;
