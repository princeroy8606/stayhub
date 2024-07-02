const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  guestId: { type: mongoose.Types.ObjectId, required: true },
  fromDate: { type: Date, required: true },
  paymentId: { type: String, required: true },
  customerName: { type: String, required: true },
  toDate: { type: Date, required: true },
  houseData: { type: Object, required: true },
  houseId: { type: mongoose.Types.ObjectId, required: true, ref: "Houses" },
  totalAmount: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now() },
  guests: { type: Number, required: true },
  paymentStatus: { type: String, required: true, default: "paid" },
  bookingStatus: { type: String, required: true, default: "pending" },
  guestDetails: { type: Array },
});

const Bookings = mongoose.model("Bookings", bookingSchema);

module.exports = Bookings;
