const mongoose = require("mongoose");

const accomodationSchema = new mongoose.Schema({
  name: {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  address: {
    area: { type: String, required: true },
    city: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: Number, required: true },
    state: { type: String, required: true },
    streetAddress: { type: String, required: true },
  },
  employeeId: { type: mongoose.Types.ObjectId, required: true },
  rentPerDay: { type: Number, required: true },
  accType: { type: String, required: true },
  images: [{}],
  capacity: {
    guests: { type: Number },
    bedrooms: { type: Number },
    bathrooms: { type: Number },
    beds: { type: Number },
  },

  aminities: [
    {
      amenitie: { type: String },
      available: { type: Boolean },
      icon: { type: String },
    },
  ],
  bookings: [{ type: mongoose.Types.ObjectId, ref: "Bookings" }],
  reviews: [
    {
      name: { type: String },
      reviewerId: { type: mongoose.Types.ObjectId },
      date: { type: Date, default: Date.now() },
      review: { type: String },
      raiting: { type: Number },
    },
  ],
  likedUsers:[{type:mongoose.Types.ObjectId}]
});
accomodationSchema.index({ "reviews.reviewerId": 1 });
accomodationSchema.index({ "reviews.raiting": 1 });

const Accomodation = mongoose.model("Accomodation", accomodationSchema);

module.exports = Accomodation;
