const Accomodation = require("../models/accomodations");
const Guest = require("../models/guest");
const Employee = require("../models/owner");

exports.updateUserDetails = async (req, res) => {
  const { UserName, Email, Phone, userType, userId, fcmToken } = req.body;
  console.log(req.body);
  try {
    let user;
    if (userType === "Admin") {
      user = await Employee.findById(userId);
    } else {
      user = await Guest.findById(userId);
    }
    if (!user) return res.status(404).json({ message: "Email doesn't exist" });

    if (UserName) user.name = UserName;
    if (Email) user.email = Email;
    if (Phone) user.phone = Phone;
    if (fcmToken) user.FcmToken = fcmToken;
    const userResponse = {
      _id: user._id,
      userType: userType,
      name: user.name,
      email: user.email,
      phone: user.phone,
      authenticated: true,
    };
    await user.save();
    res.status(200).json({
      updated: true,
      message: "User Details has been successfully updated",
      userResponse,
    });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.likedHouses = async (req, res) => {
  const GuestId = req.params.id;
  try {
    const guest = await Guest.findById(GuestId).populate("likes");
    res.status(200).json(guest?.likes);
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.updateLike = async (req, res) => {
  const { houseId, GuestId, type, houseName } = req.body;
  try {
    if (type === "add") {
      await Guest.findByIdAndUpdate(
        GuestId,
        { $push: { likes: houseId } },
        { new: true }
      );
      await Accomodation.findByIdAndUpdate(
        houseId,
        { $push: { likedUsers: GuestId } },
        { new: true }
      );
    }

    if (type === "remove") {
      await Guest.findByIdAndUpdate(
        GuestId,
        { $pull: { likes: houseId } },
        { new: true }
      );
      await Accomodation.findByIdAndUpdate(
        houseId,
        { $pull: { likedUsers: GuestId } },
        { new: true }
      );
    }

    res.status(200).json({ actionType: type, houseName: houseName });
  } catch (err) {
    res.status(400).json(err);
  }
};

exports.deleteUser = async (req, res) => {
  const {employeeId,guestId} = req.body;
  console.log(guestId)
  try {
    const user = await Guest.findByIdAndDelete(guestId);
    console.log(user)
    res.status(200).json({ ok: true });
  } catch (err) {
    res.status(400).json(err);
  }
};
