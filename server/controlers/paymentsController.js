const Bookings = require("../models/bookings");
const Guest = require("../models/guest");
const Accomodation = require("../models/accomodations");
const { earningsChartData, bookingsChartData } = require("../utils/custom");
const stripe = require("stripe")(process.env.STRIPE_KEY);
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

exports.getBalance = async (req, res) => {
  const now = new Date();

  const lastMonthStart = new Date(now);
  lastMonthStart.setMonth(lastMonthStart.getMonth(), 1);
  const lastMonthStartTimestamp = Math.floor(lastMonthStart.getTime() / 1000)

  const firstDayOfNextMonth = new Date(
    now.getFullYear(),
    now.getMonth() + 1,
    1
  );
  const lastMonthEnd = new Date(firstDayOfNextMonth.getTime() - 1);
  const lastMonthEndTimeStamp = Math.floor(lastMonthEnd.getTime() / 1000);

  try {
    // const balance = await stripe.balance.retrieve();
    // const payments = await stripe.paymentIntents.list();

    // const filterdPayments = payments?.data?.filter((payment) => {
    //   return (
    //     payment.created > lastMonthStartTimestamp &&
    //     payment.created < lastMonthEndTimeStamp
    //   );
    // });

    const sumOfPayemnts = (paymentList)=>{
      let Earnings = 0;
      paymentList?.forEach((payment) => {
        Earnings += payment.amount;
      });
      return Earnings
     }

    const Payments = await razorpay.payments.all();

    const filteredPayments = Payments?.items?.filter(
      (payment) =>
        payment.created_at <= lastMonthEndTimeStamp &&
        payment.created_at >= lastMonthStartTimestamp
    );

    const lastMonthEarnings = sumOfPayemnts(filteredPayments)
    const totalEarnings = sumOfPayemnts(Payments?.items)
   
    const EarningsData = {
      balance: totalEarnings,
      lastMonthEarnings,
      paymnets: Payments?.items?.reverse(),
    };
    res.status(200).json(EarningsData);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllChartData = async (req, res) => {
  const today = new Date();
  try {
    const paymentList = await earningsChartData();
    const bookingList = await bookingsChartData();
    const houses = await Accomodation.find();
    const bookedHouses = await Bookings.find({
      $and: [{ toDate: { $gte: today } }, { bookingStatus: "booked" }],
    });

    const bookedHouseIds = bookedHouses.map((booking) =>
      booking.houseId.toString()
    );
    const availableHouses = houses.filter(
      (house) => !bookedHouseIds.includes(house._id.toString())
    );

    const occupiedBookings = bookedHouses.filter((bookings) => {
      return bookings.fromDate <= today && bookings.toDate >= today;
    });

    const bookedCountMap = new Map();
    const countValue = (bookingsArray) => {
      let Count = 0;
      bookingsArray.forEach((booking) => {
        const houseId = bookedCountMap.get(booking.houseId);
        if (!houseId) {
          Count++;
          bookedCountMap.set(booking.houseId);
        }
      });
      return Count;
    };
    const bookedHouseCount = countValue(bookedHouses);
    const occupiedHouseCount = countValue(occupiedBookings);
    const pieChartValues = {
      TotalHouses: houses.length,
      booked: bookedHouseCount,
      occupied: occupiedHouseCount,
      availabe: availableHouses.length,
    };

    res.status(200).json({ paymentList, bookingList, pieChartValues });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
