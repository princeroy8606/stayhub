import React from "react";
import assets from "../../../assets/assets";
import { dateCalculator } from "./dateCalculator";
import { useDispatch } from "react-redux";
import {
  cancelBookedHouse,
  confirmBooking,
  getBookings,
} from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";

const BookingDetailsCard = ({ handleCancel, bookingData }) => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const CancelBooking = () => {
    dispatch(cancelBookedHouse(bookingData?._id));
    dispatch(getBookings(userData?._id));
    handleCancel();
  };

  const handleConfirm = () => {
    dispatch(confirmBooking({ Id: bookingData?._id, AdminId: userData?._id }));
    dispatch(getBookings(userData?._id));
    handleCancel();
  };

  return (
    <div className="popUp-room-edit">
      <div className="cancel-btn" onClick={() => handleCancel(false)}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      <div className="block-center-form block-center-form-edit">
        <h2>{bookingData?.bookingStatus.toUpperCase()}</h2>
        <div className="booking-info-block">
          <h4>House Name : </h4>
          <h5>{bookingData?.houseData.name.title}</h5>
        </div>
        <div className="booking-info-block">
          <h4>Location :</h4>
          <h5>{bookingData?.houseData.address.streetAddress}</h5>
        </div>
        <div className="booking-info-block">
          <h4>Rent Type :</h4>
          <h5>{bookingData?.houseData.type}</h5>
        </div>
        <div className="booking-info-block">
          <h4>Rent Per Day :</h4>
          <h5>{bookingData?.houseData.rentPerDay}/-</h5>
        </div>
        <div className="booking-info-block">
          <h4>Customer Name :</h4>
          <h5> {bookingData?.customerName}</h5>
        </div>
        <div className="booking-info-block">
          <h4>No of Guests:</h4>
          <h5> {bookingData?.guests}</h5>
        </div>
        <div className="booking-info-block form-input-cnt rolen-input-cnt">
          <h5>from: {dateCalculator(bookingData.fromDate)} </h5>
          <h5>To: {dateCalculator(bookingData.toDate)} </h5>
        </div>
        <div className="booking-info-block">
          <h4>Total Amount :</h4>
          <h5> {bookingData?.totalAmount}</h5>
        </div>
        {/* <div className="edit-employee-btns-cnt">
          <div
            className="submit-btn"
            style={{
              backgroundColor:
                bookingData?.bookingStatus === "pending" ? "black" : "#4c4d4c",
              pointerEvents:
                bookingData?.bookingStatus === "pending" ? "all" : "none",
            }}
            onClick={CancelBooking}
          >
            Cancel Booking
          </div>
          <div
            className="submit-btn"
            style={{
              backgroundColor:
                bookingData?.bookingStatus === "pending" ? "green" : "#6fc96f",
              pointerEvents:
                bookingData?.bookingStatus === "pending" ? "all" : "none",
            }}
            onClick={handleConfirm}
          >
            Confrom Booking
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default BookingDetailsCard;
