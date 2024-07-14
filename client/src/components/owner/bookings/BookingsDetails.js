import React, { useEffect, useState } from "react";
import BookedCard from "./bookedCard";
import { useDispatch, useSelector } from "react-redux";
import { getBookings } from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";
import BookingDetailsCard from "./bookingDetailsCard";

const BookingsDetails = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const [popUp, setPopUp] = useState(false);
  const [popUpData, setPopUpData] = useState(null);

  const bookingsList = useSelector((state) => state?.ownerReducer?.bookings);

  useEffect(() => {
    dispatch(getBookings(userData?._id));
  }, []);

  const togglePopUp = (data) => {
    setPopUp(true);
    setPopUpData(data);
  };

  return (
    <div className="dashboard-cnt property">
      {popUp && (
        <BookingDetailsCard
          handleCancel={() => setPopUp(false)}
          bookingData={popUpData}
        />
      )}
      <div className="dashboard-top">
        <h2 className="dashboard-head-text">Bookings</h2>
      </div>
      <div className="bookings-list-cnt">
        <div className="booked-card-cnt" style={{ backgroundColor: "#aee371" }}>
          <h3 className="booked-list-item">Customer</h3>
          <h3 className="booked-list-item">Date</h3>
          <h3 className="booked-list-item">Amount</h3>
          <h3 className="booked-list-item">Booking status</h3>
          <h3 className="booked-list-item">Option</h3>
        </div>
        {bookingsList?.map((booking) => (
          <BookedCard
            data={booking}
            key={booking?._id}
            openPopUP={() => togglePopUp(booking)}
          />
        ))}
      </div>
    </div>
  );
};

export default BookingsDetails;
