const bcrypt = require("bcrypt");
const nodeMailer = require("nodemailer");

require("dotenv").config();

exports.generateOTP = async (otp) => {
  const hashedOtp = await bcrypt.hash(otp.toString(), 10);
  return hashedOtp;
};

exports.mailTransport = () =>
  nodeMailer.createTransport({
    service: "gmail",
    auth: {
      user: "yourhostelmate@gmail.com",
      // process.env.GMAIL_USER_NAME,
      pass: "gddrdmsvugsngrja",
      // process.env.GMAIL_PASSWORD
    },
  });
