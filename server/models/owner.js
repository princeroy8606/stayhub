const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  phone: { type: Number, required: true },
  accomodations: [{ type: mongoose.Types.ObjectId, ref: "Accomodation" }],
  FcmToken: { type: String },

});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
