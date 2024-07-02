const Bookings = require("../models/bookings");
const Accomodation = require("../models/accomodations");
const Owner = require("../models/owner");
const {
  getAllRooms,
  checkRoomAvailability,
  getAllHouses,
  deleteImage,
} = require("../utils/custom");
const Employee = require("../models/owner");
const Guest = require("../models/guest");

exports.addHouses = async (req, res) => {
  const data = {
    Name: JSON.parse(req.body.Name),
    Address: JSON.parse(req.body.Address),
    RentPerDay: parseInt(req.body.RentPerDay),
    EmployeeId: req.body.OwnerId,
    RoomsInfo: JSON.parse(req.body.RoomsInfo),
    Amenities: JSON.parse(req.body.Amenities),
    AccType: req.body.AccType,
  };
  const imageDetails = [];
  const employee = await Employee.findById(data?.EmployeeId);
  if (req.files) {
    req.files.forEach((file) => {
      imageDetails.push({
        originalname: file.originalname,
        filename: file.filename,
        path: file.path,
        url: `/uploads/${file.filename}`,
      });
    });
  }

  try {
    const house = new Accomodation({
      name: data?.Name,
      address: data?.Address,
      employeeId: employee._id,
      rentPerDay: data?.RentPerDay,
      aminities: data?.Amenities,
      accType: data?.AccType,
      capacity: data?.RoomsInfo,
      images: imageDetails,
    });
    employee.accomodations.push(house._id);
    employee.save();
    await house.save();
    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getOwnersHouse = async (req, res) => {
  const OwnerId = req.params.id;

  const owner = await Owner.findById(OwnerId);

  if (!owner) return res.status(401).json({ message: "User Not Found" });

  try {
    const houses = await Accomodation.find();
    res.status(200).json(houses);
  } catch (err) {
    res.status(404).json(err.message);
  }
};

exports.availabilityCheck = async (req, res) => {
  const query = {};
  const { Location, FromDate, ToDate, GuestCount, GuestId } = req.body;
  const guest = await Guest.findById(GuestId);
  if (Location) {
    if (guest) {
      guest.searchedLocations.length >= 2 && guest.searchedLocations.shift();
      guest.searchedLocations.push(Location);
    }
    query.$or = [
      { "address.area": { $regex: new RegExp(Location, "i") } },
      { "address.country": { $regex: new RegExp(Location, "i") } },
      { "address.state": { $regex: new RegExp(Location, "i") } },
      { "address.city": { $regex: new RegExp(Location, "i") } },
    ];
  }
  if (GuestCount) {
    query["capacity.guests"] = { $gte: GuestCount };
  }
  const searchData = {
    fromDate: FromDate ? FromDate : null,
    toDate: ToDate ? ToDate : null,
    GuestCount: GuestCount ? GuestCount : null,
    Location: Location ? Location : null,
  };

  const regexQueries = guest?.searchedLocations?.map(
    (location) => new RegExp(location, "i")
  );

  const recommendationQuery = {
    $or: [
      { "address.area": regexQueries },
      { "address.country": regexQueries },
      { "address.state": regexQueries },
    ],
  };

  const recommendedAccommodations = await Accomodation.find(
    recommendationQuery
  ).limit(2);

  try {
    const matchingAccomodations = await Accomodation.find(query);
    const bookedCapacityMap = new Map();
    if (FromDate && ToDate) {
      const bookings = await Bookings.find({
        houseId: {
          $in: matchingAccomodations.map((accomodation) => accomodation._id),
        },
        bookingStatus: { $in: ["booked", "pending"] },
        $and: [{ fromDate: { $lte: ToDate } }, { toDate: { $gte: FromDate } }],
      });
      bookings.forEach((booking) => {
        const accommodationId = booking.houseId.toString();
        const bookedCapacity = bookedCapacityMap.get(accommodationId) || 0;
        bookedCapacityMap.set(accommodationId, bookedCapacity + booking.guests);
      });

      const accommodationsWithMinimumAvailability =
        matchingAccomodations.filter((accommodation) => {
          const totalBookedCapacity =
            bookedCapacityMap.get(accommodation._id.toString()) || 0;
          const availableCapacity =
            accommodation.capacity.guests - totalBookedCapacity;
          return availableCapacity >= GuestCount;
        });
      return res
        .status(200)
        .json({ data: accommodationsWithMinimumAvailability, searchData });
    }
    if (guest) await guest.save();
    return res.status(200).json({
      data: matchingAccomodations,
      searchData,
      recommended: recommendedAccommodations,
    });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

exports.RoomAvailabeForTheDay = async (req, res) => {
  const { HouseId, FromDate, ToDate } = req.body;

  try {
    const house = await Houses.findById(HouseId);
    const rooms = house?.rooms;

    if (!house) return res.status(404).json({ message: "House Not found" });

    const bookings = await Bookings.find({
      houseId: HouseId,
      $or: [
        { fromDate: { $gte: FromDate, $lte: ToDate } },
        { toDate: { $gte: FromDate, $lte: ToDate } },
      ],
    });

    if (bookings?.rooms?.length === rooms?.length) {
      return res.status(200).json({ ok: false, rooms: rooms?.length });
    }

    let Rooms = [];
    for (const Room of rooms) {
      let match = false;
      for (const one of bookings) {
        one?.rooms?.forEach((room) => {
          if (room.roomNo === Room.roomNo) match = true;
        });
      }
      if (!match) Rooms.push({ roomNo: Room?.roomNo });
    }

    res.status(200).json({ ok: true, rooms: Rooms });
  } catch (err) {
    console.log(err);
  }
};

exports.editHouseDetails = async (req, res) => {
  const { Address, Capacity, Amenities, Name, Price } = req.body;
  const HouseId = req.params.id;
  try {
    const house = await Accomodation.findById(HouseId);
    if (!house)
      return res.status(500).json({ message: "Unable to Edit the House" });
    if (req.files && req.files.length > 0) {
      req.files.forEach((file, index) => {
        deleteImage(house.images[index]);
        house.images[index] = {
          originalname: file.originalname,
          filename: file.filename,
          path: file.path,
          url: `/uploads/${file.filename}`,
        };
      });
    }
    if (Address) house.address = Address;
    if (Capacity) house.capacity = Capacity;
    if (Amenities) house.aminities = Amenities;
    if (Name) house.name = Name;
    if (Price) house.rentPerDay = Price;

    await house.save();
    res.status(200).json({ ok: true, data: house });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

exports.deleteAccomodation = async (req, res) => {
  const HouseId = req.params.id;
  try {
    const house = await Accomodation.findById(HouseId);
    house.images?.forEach((image) => {
      deleteImage(image);
    });
    await Accomodation.findByIdAndDelete(HouseId);
    res.status(200).json({ deleted: true });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.addReview = async (req, res) => {
  const { HouseId, Raiting, Review, GuestId } = req.body;
  try {
    const user = await Guest.findById(GuestId);
    if (!user)
      return res.status(400).json({ message: "You are note authorized" });
    const house = await Accomodation.findById(HouseId);
    if (!house)
      return res.status(400).json({ message: "Error Adding Review try Later" });

    house.reviews.unshift({
      name: user.name,
      reviewerId: user._id,
      review: Review,
      raiting: Raiting,
    });
    await house.save();
    res.status(200).json(true);
  } catch (err) {
    res.status(400).json({ message: "unable to Add your review" });
  }
};
