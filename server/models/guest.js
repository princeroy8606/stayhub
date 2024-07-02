const mongoose = require("mongoose");

const guestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  role: { type: String, required: true },
  password: { type: String, required: true },
  city: { type: String, required: true },
  addressProof: { type: Object, required: true },
  country: { type: String, required: true },
  gender: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: Number, required: true },
  age: { type: Number, required: true },
  pincode: { type: Number, required: true },
  terms: { type: Boolean, required: true },
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Bookings" }],
  searchedLocations: [{ type: String, default: "india" }],
  FcmToken: { type: String },
  likes: [{ type: mongoose.Types.ObjectId, ref: "Accomodation" }],
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
