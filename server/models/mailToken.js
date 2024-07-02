const mongoose = require("mongoose");

const mailTokenSchema = new mongoose.Schema({
  email: { type: String, required: true },
  OTP: { type: String, required: true },
  createdAt: {
    type: Date,
    expires: 1000,
    default: Date.now(),
  },
});

const MailOTP = mongoose.model('MailOTP',mailTokenSchema)
module.exports = MailOTP
