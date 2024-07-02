const fs = require("fs");
const Guest = require("../models/guest");
const Owner = require("../models/owner");
const Employee = require("../models/owner");
const Bookings = require("../models/bookings");
const { getAllRooms } = require("../utils/custom");
const Accomodation = require("../models/accomodations");
const { SendMessage } = require("../firebase/sendMessage");
const { generateBookingRestemplate } = require("../utils/bookingResTemplate");
const { mailTransport } = require("../utils/email");
const { generateCancellation } = require("../utils/cancelationTemplate");
const Razorpay = require("razorpay");
const Stripe = require("stripe")(process.env.STRIPE_KEY);

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.newBooking = async (req, res) => {
  const bookingData = JSON.parse(req.body["booking-data"]);
  const { GuestId, FromDate, ToDate, HouseId } = bookingData?.bookingDetails;

  const user = await Guest.findById(GuestId);
  if (!user) return res.status(500).json({ message: "You are not authorized" });
  const house = await Accomodation.findById(HouseId);
  if (!house)
    return res.status(400).json({ message: "Unable to Book the house" });

  const noOfDays =
    (new Date(ToDate["$d"]) - new Date(FromDate["$d"])) / (24 * 60 * 60 * 1000);

  const uniquieIdentifier = "devPrince@3000";
  fs.writeFileSync(
    `./utils/${uniquieIdentifier}.json`,
    JSON.stringify(bookingData)
  );

  const options = {
    amount: house.rentPerDay * 100 * noOfDays,
    currency: "INR",
    receipt: "receipt#1",
    notes: {
      u_id: uniquieIdentifier,
    },
  };
  try {
    const response = await razorpay.orders.create(options);
    // const session = await Stripe.checkout.sessions.create({
    //   payment_method_types: ["card"],
    //   mode: "payment",
    //   success_url: "http://localhost:3000/payment-success",
    //   cancel_url: "http://localhost:3000/payment-cancel",
    //   line_items: [
    //     {
    //       price_data: {
    //         currency: "INR",
    //         product_data: {
    //           name: house.name.title,
    //           description: house.name.description,
    //           images: [
    //             `https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2CkF52H7UGDUZHgGLM7HOixD9YHQV4VTWA&usqp=CAU`,
    //           ],
    //         },
    //         unit_amount: house.rentPerDay * 100,
    //       },
    //       quantity: noOfDays,
    //     },
    //   ],
    //   metadata: {
    //     data: uniquieIdentifier,
    //   },
    // });
    return res.status(200).json(response);
  } catch (err) {
    console.log(err);
    return res.status(401).json({ message: err.message });
  }
};

exports.stripePayementStatus = async (req, res) => {
  console.log("Webhook Connected");
  if (req.body?.data) {
    const filePath = req.body?.data;
    const jsonData = fs.readFileSync(`./utils/${filePath}.json`, "utf8");
    const data = JSON.parse(jsonData);

    fs.unlink(`./utils/${filePath}.json`, (err) => {
      if (err) {
        console.error("Error deleting file:", err);
        return;
      }
      console.log("File deleted successfully");
    });

    const bookingData = data?.bookingDetails;
    let guestDatas = data?.gusetDetails;
    const from = new Date(bookingData?.FromDate["$d"]);
    const To = new Date(bookingData?.ToDate["$d"]);
    const noOfDays = (To - from) / (24 * 60 * 60 * 1000);

    try {
      const house = await Accomodation.findById(bookingData?.HouseId);
      if (!house) throw new Error("house Not found");
      const user = await Guest.findById(bookingData?.GuestId);
      if (!user) throw new Error("house Not found");
      const Total = house?.rentPerDay * noOfDays;

      if (data.self) {
        const selfdata = {
          name: user.name,
          email: user.email,
          pincode: user.pincode,
          gender: user.gender,
          address: user.city + "," + user.state + "," + user.country,
          phone: user.phone,
          age: user.age,
          proof: user.addressProof,
          verified: true,
        };

        guestDatas.push(selfdata);
      }

      const houseData = {
        name: house?.name,
        address: house?.address,
        rentPerDay: house?.rentPerDay,
        images: house?.images,
        type: house?.accType,
      };
      const booking = new Bookings({
        guestId: bookingData?.GuestId,
        houseId: bookingData?.HouseId,
        fromDate: from,
        toDate: To,
        guests: bookingData?.GuestCount,
        customerName: user?.name,
        totalAmount: Total,
        paymentId: req.body?.payment_intent,
        houseData: houseData,
        guestDetails: guestDatas,
        bookingStatus: "booked",
      });
      user.bookings.push(booking._id);
      user.save();
      await booking.save();

      const mailData = {
        from: booking.fromDate,
        to: booking.toDate,
        name: user.name,
        noOfGuest: booking.guests,
        AccName: booking?.houseData?.name?.title,
      };
      mailTransport().sendMail({
        from: "yourhostelmate@gmail.com",
        to: user.email,
        subject: "Accomodation Booking Conformed",
        text: `Your booking for the ${booking?.houseData?.name?.title} has been confirmed `,
        html: generateBookingRestemplate(mailData),
      });
      const Message = {
        title: "StayHub Booking Conformed",
        body: `Your Booking for  ${booking.houseData?.name?.title} Has been Conformed `,
      };
      await SendMessage({ token: user.FcmToken, messageData: Message });

      res.status(200).json({ url: "http://localhost:3000/payment-success" });
    } catch (err) {
      res.status(404).json(err);
    }
  }
};

exports.getBookingHistory = async (req, res) => {
  const EmployeeId = req.params.id;
  try {
    const bookings = await Bookings.find();

    res.status(200).json(bookings.reverse());
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

exports.guestBookingHistory = async (req, res) => {
  const GuestId = req.params.id;
  console.log(GuestId)
  try {
    const bookings = await Bookings.find({ guestId: GuestId });
    res.status(200).json(bookings);
  } catch (err) {
    res.status(404).json({ err: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  const bookingId = req.params.id;
  console.log(bookingId,"IDDD")
  try {
    const booking = await Bookings.findById(bookingId);
    const user = await Guest.findById(booking.guestId);
    const mailData = {
      from: booking.fromDate,
      to: booking.toDate,
      name: user.name,
      noOfGuest: booking.guests,
      AccName: booking?.houseData?.name?.title,
    };
    // const refund = await Stripe.refunds.create({
    //   payment_intent: booking?.paymentId,
    //   amount: booking.totalAmount,
    // });
    booking.bookingStatus = "Canceled";
    mailTransport().sendMail({
      from: "yourhostelmate@gmail.com",
      to: user.email,
      subject: "Accomodation Booking Cancelled",
      text: `Your booking for the ${booking?.houseData?.name?.title} has been cancelled `,
      html: generateCancellation(mailData),
    });
    const Message = {
      title: "StayHub Booking Canceled",
      body: `Your Booking for  ${booking.houseData?.name?.title} Has been Canceled visit Website for details `,
    };
    await SendMessage({ token: user.FcmToken, messageData: Message });
    await booking.save();
    res.status(200).json(user?._id);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.confrimBooking = async (req, res) => {
  const bookingId = req.params.id;
  try {
    const booking = await Bookings.findById(bookingId);
    const user = await Guest.findById(booking.guestId);
    const mailData = {
      from: booking.fromDate,
      to: booking.toDate,
      name: user.name,
      noOfGuest: booking.guests,
      AccName: booking?.houseData?.name?.title,
    };
    booking.bookingStatus = "booked";
    mailTransport().sendMail({
      from: "yourhostelmate@gmail.com",
      to: user.email,
      subject: "Accomodation Booking Conformed",
      text: `Your booking for the ${booking?.houseData?.name?.title} has been confirmed `,
      html: generateBookingRestemplate(mailData),
    });
    const Message = {
      title: "StayHub Booking Conformed",
      body: `Your Booking for  ${booking.houseData?.name?.title} Has been Conformed `,
    };
    await SendMessage({ token: user.FcmToken, messageData: Message });
    await booking.save();
    res.status(200).json({
      message: `${booking.houseData?.name?.title} Booking Confrimed `,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
