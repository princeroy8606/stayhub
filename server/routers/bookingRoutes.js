const express = require("express");
const router = express.Router();
const BOOKING = require("../controlers/bookingsController");
const upload = require("../utils/multer-config");


router.post("/new", upload.array('guest-address-proof'), BOOKING.newBooking);
router.post("/payment-response", BOOKING.stripePayementStatus);
router.put("/cancel/:id", BOOKING.cancelBooking);
router.put("/confirm/:id", BOOKING.confrimBooking);
router.get("/:id", BOOKING.getBookingHistory);
router.get("/guest/:id", BOOKING.guestBookingHistory);

module.exports = router;
