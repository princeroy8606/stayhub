const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const Houses = require("../models/accomodations");
const Bookings = require("../models/bookings");
const fs = require("fs");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.passwordHasher = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
};

exports.createToken = (name, Type) => {
  const token = Jwt.sign(
    { userName: name, role: Type },
    process.env.SECRECT_KEY,
    { expiresIn: "50m" }
  );
  return token;
};

exports.deleteImage = (file) => {
  fs.unlink(
    `D:/Codes/React-Js/cartRabit/cartRabit/Server/uploads/${file.filename}`,
    (err) => {
      if (err) {
        console.log(err);
      } else {
        return true;
      }
    }
  );
};

exports.earningsChartData = async () => {
  const year = 2024;  
  const startOfYear = new Date(year, 0, 1);
  const timestamp = Math.floor(startOfYear.getTime() / 1000);
  try {
    const paymets = await stripe.paymentIntents.list({
      created: { gt: timestamp },
    });
    const modifiedpayments = new Map();
    for (let month = 1; month <= new Date().getMonth(); month++) {
      modifiedpayments.set(month, { earnings: 0, profit: 0 });
    }
    paymets.data.forEach((element) => {
      const month = new Date(element.created * 1000).getMonth()+1;
      const existingAmount = modifiedpayments.get(month);
      if (existingAmount) {
        modifiedpayments.set(month, {
          earnings: existingAmount.earnings + element.amount_received,
          profit: existingAmount.profit + 15000,
        });
      } else {
        modifiedpayments.set(month, {
          earnings: element.amount_received,
          profit: 15000,
        });
      }
    });
    const paymetsData = Array.from(modifiedpayments.entries()).map(
      ([month, object]) => ({
        month,
        Earnings: object.earnings,
        profit: object.profit,
      })
    );
    return paymetsData;
  } catch (err) {
    throw err;
  }
};

exports.bookingsChartData = async () => {
  const year = 2023;
  const startOfYear = new Date(year, 0, 1);
  try {
    const bookings = await Bookings.find({ date: { $gte: startOfYear } });
    if (!bookings) return null;

    const compressData = new Map();
    for (let month = 1; month <= new Date().getMonth(); month++) {
      compressData.set(month, 0);
    }

    bookings.forEach((booking) => {
      const month = new Date(booking.date).getMonth() + 1;
      const count = compressData.get(month);
      if (count) {
        compressData.set(month, count + 1);
      } else {
        compressData.set(month, 1);
      }
    });
    const listData = Array.from(compressData.entries()).map(
      ([month, count]) => ({
        month,
        count,
      })
    );
    return listData;
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
