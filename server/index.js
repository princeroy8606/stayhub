const mongoose = require("mongoose");
const express = require("express");
const cookieParser = require("cookie-parser");
const Cors = require("cors");

require("dotenv").config();

const authRouter = require("./routers/authRoutes");
const houseRouter = require("./routers/houseRouter");
const bookingsRouter = require("./routers/bookingRoutes");
const userRouter = require("./routers/userRouter");
const employeeRouter = require("./routers/employeeRoutes");
const paymentRouter = require("./routers/payementsRoutes");

const app = express();
app.use("/uploads", express.static("uploads"));

app.use(cookieParser());

app.use(
  Cors({
    origin: "https://stayhub-three.vercel.app",
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("Connection Successful");
});

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(5000, () => {
      console.log("Database in Action");
    });
  })  
  .catch((err) => {
    console.error("Connection error:", err);
  });

app.use(express.json());

app.use("/auth", authRouter);
app.use("/employee", employeeRouter);
app.use("/houses", houseRouter);
app.use("/booking", bookingsRouter);
app.use("/user", userRouter);
app.use("/payments", paymentRouter);
