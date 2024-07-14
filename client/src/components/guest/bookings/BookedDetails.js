import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import {
  cancelBookedHouse,
  postReview,
} from "../../../redux/features/actions/guestActions";
import { useAuth } from "../../../context/authContext";

const BookedDetails = () => {
  const bookingData = useLocation()?.state?.data;
  const [raiting, setRaiting] = useState(1);
  const [review, setReview] = useState(null);
  const HouseData = bookingData?.houseData;

  const dispatch = useDispatch();
  const { userData } = useAuth();

  const getDate = (date) => {
    const originalDate = new Date(date);
    return `${originalDate.getDate()}/${
      originalDate.getMonth() + 1
    }/${originalDate.getFullYear()}`;
  };

  const dateDifference = (toDate, fromDate) => {
    return (new Date(toDate) - new Date(fromDate)) / (24 * 60 * 60 * 1000);
  };

  const cancelationAvalilabe = (toDate) => {
    const today = new Date().getTime();
    return new Date(toDate).getTime() > today;
  };

  const submitReview = () => {
    if (review && raiting)
      dispatch(
        postReview({
          Review: review,
          Raiting: raiting,
          HouseId: bookingData?.houseId,
          GuestId: userData?._id,
        })
      );
  };

  const handleCancel = () => {
    dispatch(cancelBookedHouse(bookingData?._id));
  };

  return (
    <div className="landing-cont booked-details-cnt">
      <div className="booked-details-bg-image-cnt">
        <img
          className="booked-details-bg-image"
          src={`${process.env.REACT_APP_BASEURL}${HouseData?.images[0]?.url}`}
        />
      </div>
      <div className="booked-house-details-cnt">
        <div className="booked-house-img-cnt gird-cnt">
          <img
            src={`${process.env.REACT_APP_BASEURL}${HouseData?.images[0]?.url}`}
            alt="house"
            className="grid-top-img"
          />
          <img
            src={`${process.env.REACT_APP_BASEURL}${HouseData?.images[1]?.url}`}
            alt="house"
            className="grid-top-img"
          />
          <img
            src={`${process.env.REACT_APP_BASEURL}${HouseData?.images[2]?.url}`}
            alt="house"
            className="grid-top-img"
            style={{ width: "100%" }}
          />
        </div>
        <div className="booked-house-img-cnt booked-house-info-cnt">
          <div className="booked-house-info-cover">
            <h3>{HouseData?.name?.title}</h3>
            <h5>{HouseData?.address?.area}</h5>
            <h5>{HouseData?.type}</h5>
            <h5>Guests :{bookingData?.guests}</h5>
            <div className="booked-date-cnt">
              <h5>From : {getDate(bookingData?.fromDate)}</h5>
              <h5>To : {getDate(bookingData?.toDate)}</h5>
            </div>
            <h5>Booked On :{getDate(bookingData?.date)}</h5>
            <h5>Booking Status : Conformed</h5>
          </div>
          <div className="booked-house-info-cover">
            <h4>payment details</h4>
            <h5>Rent for One Day : {HouseData?.rentPerDay}</h5>
            <h5>
              Rent Total :{" "}
              {HouseData?.rentPerDay *
                dateDifference(bookingData?.toDate, bookingData?.fromDate)}
            </h5>
            <h5>Service Fee: 500</h5>
            <h3>Total: {Number(bookingData?.totalAmount) + 500}</h3>
            <h5>Payment Status : {bookingData?.paymentStatus}</h5>
          </div>
          {cancelationAvalilabe(bookingData?.toDate) &&
            (bookingData?.bookingStatus !== "Canceled" ? (
              <div className="cancel-booking-btn" onClick={handleCancel}>
                Cancel Booking
              </div>
            ) : (
              <div className="cancel-booking-btn" style={{background:"#F0C0C0",border:"none"}}>
                Canceled
              </div>
            ))}
        </div>
        <div className="booked-house-raiting-cnt">
          <div
            className="booked-raiting-cnt"
            style={{
              pointerEvents: cancelationAvalilabe(bookingData?.toDate)
                ? "none"
                : "auto",
              opacity: cancelationAvalilabe(bookingData?.toDate) ? 0.5 : 1,
            }}
          >
            <h3>Rate the House</h3>
            <Rating
              name="size-large"
              value={raiting}
              size="large"
              onChange={(e, value) => setRaiting(value)}
            />
            <div className="booked-review-input-cnt">
              <h4>Share your experience </h4>
              <textarea
                type="text"
                className="booked-review-input"
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
            <div className="review-submit-btn" onClick={submitReview}>
              Submit
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookedDetails;
