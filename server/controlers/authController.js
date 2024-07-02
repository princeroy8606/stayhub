const Guest = require("../models/guest");
const bcrypt = require("bcrypt");
const { passwordHasher, createToken } = require("../utils/custom");
const { generateOTP, mailTransport } = require("../utils/email");
const MailOTP = require("../models/mailToken");
const { generateEmailTemplate } = require("../utils/emialTemplate");
const Employee = require("../models/owner");
const stripe = require("stripe")(process.env.STRIPE_KEY);

exports.SignUp = async (req, res) => {
  // const { UserType, Phone, Email, Password, Name } = req.body;
  console.log(req.body)
  const userData = {
    Name: req.body.name,
    Email: req.body.email,
    Gender: req.body.gender,
    City: req.body.city,
    Country: req.body.country,
    State: req.body.state,
    Password: req.body.password,
    Terms: req.body.terms,
    Phone: parseInt(req.body.phone),
    Age: parseInt(req.body.dob),
    Pincode: parseInt(req.body.pincode),
  };
  console.log(userData)
  const encryptedPassword = await passwordHasher(userData.Password);
  const token = createToken(userData.Name, "guest");
  try {
    let existingUser = await Guest.findOne({ email: userData.Email });
    if (!existingUser) {
      existingUser = await Employee.findOne({ email: userData.Email });
    }
    if (existingUser)
      return res.status(500).json({ message: "Email Already exists" });

    const fileData = {
      originalName: req.files[0].originalname,
      filename: req.files[0].filename,
      path: req.files[0].path,
      url: `/uploads/${req.files[0].filename}`,
    };
    console.log(fileData);
    const newGuest = new Guest({
      name: userData.Name,
      phone: userData.Phone,
      email: userData.Email,
      gender: userData.Gender,
      role: "guest",
      age: userData.Age,
      password: encryptedPassword,
      pincode: userData.Pincode,
      city: userData.City,
      country: userData.Country,
      state: userData.State,
      terms: userData.Terms,
      addressProof: fileData,
    });

    const customer = await stripe.customers.create({
      email: userData.Email,
    });

    if (!customer)
      return res
        .status(400)
        .json({ message: "Unable to register check Email" });
    await newGuest.save();
    const userResponse = {
      userType: "guest",
      _id: newGuest._id,
      name: newGuest.name,
      email: newGuest.email,
      phone: newGuest.phone,
      age: newGuest.age,
      address: newGuest.address,
      pincode: newGuest.pincode,
      country: newGuest.country,
      state: newGuest.state,
      gender: newGuest.gender,
      authenticated: true,
    };
    res.cookie("accessToken", token, {
      maxAge: 60 * 1500,
    });
    return res.status(200).json({ ok: true, userResponse });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.Login = async (req, res) => {
  const { Email, Password, UserType } = req.body;
  try {
    let user = await Employee.findOne({ email: Email });
    // console.log(user)
    if (!user) {
      user = await Guest.findOne({ email: Email });
    }
    if (!user) return res.status(404).json({ message: "Email doesn't exist" });
    const passwordMatch = await bcrypt.compare(Password, user.password);

    if (!passwordMatch)
      return res.status(404).json({ message: "Password mismatch", ok: false });

    const token = createToken(user.name, user.role);

    res.cookie("accessToken", token, {
      maxAge: 60 * 1500,
    });

    const userResponse = {
      _id: user._id,
      userType: user.role,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user?.role,
      authenticated: true,
    };
    console.log(userResponse);
    return res.status(200).json({ ok: true, userResponse });
  } catch (err) {
    console.log(err);
  }
};

exports.emailVerify = async (req, res) => {
  const {Email } = req.body;
  try {
    let user = await Employee.findOne({ email: Email });
    if (!user) {
      user = await Guest.findOne({ email: Email });
    }
    if (!user) return res.status(404).json({ message: "Email doesnot Exist" });
    let randomOTP = Math.round(Math.random() * 9000) + 1000;
    const otp = await generateOTP(randomOTP);
    console.log(otp);
    const Token = new MailOTP({
      OTP: otp,
      email: Email,
    });

    mailTransport().sendMail({
      from: "yourhostelmate@gmail.com",
      to: Email,
      subject: "Email verification for forgotten password",
      text: "kindly use this otp to reset password",
      html: generateEmailTemplate(randomOTP),
    });

    await Token.save();
    res.status(200).json({
      verified: true,
      message: "OTP send Successfully",
      tokenId: Token._id,
    });
  } catch (err) {
    res.status(400).json(err.message);
  }
};

exports.OTPverify = async (req, res) => {
  const { otp, Id } = req.body;
  console.log(req.body);
  try {
    const existingMail = await MailOTP.findById(Id);
    console.log(existingMail);
    if (!existingMail)
      return res.status(408).json({
        verified: false,
        message: "The OTP has been expired get new one !",
      });

    bcrypt.compare(otp.toString(), existingMail.OTP, function (err, result) {
      console.log(result, "result");
      result
        ? res.status(200).json({
            verified: true,
            message: "OTP Verified",
            Email: existingMail?.email,
          })
        : res.status(404).json({ verified: false, message: "OTP Missmatch" });
    });
  } catch (err) {
    res.status(400).json({ message: "OTP timeout" });
  }
};

exports.upDatePassword = async (req, res) => {
  const { userType, Email, password } = req.body;
  let user;
  if (userType === "Admin") {
    user = await Employee.findOne({ email: Email });
  } else {
    user = await Guest.findOne({ email: Email });
  }
  if (!user) return res.status(404).json({ message: "Email doesn't exist" });
  const hashedPassword = await bcrypt.hash(password, 12);
  try {
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ verified: true, message: "Password Updated Successfully," });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
