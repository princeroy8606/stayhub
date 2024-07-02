import React from "react";
import assets from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const BookingHistoryCard = ({ data, handleFun }) => {
  const Navigate = useNavigate();
  const HouseData = data?.houseData;

  const getDate = (date) => {
    const originalDate = new Date(date);
    return `${originalDate.getDate()}-${
      originalDate.getMonth() + 1
    }-${originalDate.getFullYear()}`;
  };

  return (
    <div className="bookings-card" onClick={() => handleFun()}>
      <img
        src={`${process.env.REACT_APP_BASEURL}${HouseData?.images[0]?.url}`}
        className="bookings-img"
      />
      <div className="bookings-card-right">
        <h3 style={{fontSize:"1.8rem"}}>{HouseData?.name?.title}</h3>
        <h5 className="booked-card-texts">{HouseData?.address?.area}</h5>
        <h5 className="booked-card-texts">booked from : {getDate(data?.fromDate)}</h5>
        <h5 className="booked-card-texts">booked till : {getDate(data?.toDate)}</h5>
        <h5 className="booked-card-texts">Amount : {data?.totalAmount}</h5>
        <h5 className="booked-card-texts">guests : {data?.guests}</h5>
        <h5 className="booked-card-texts" style={{fontWeight:"600"}}>
          booking Status :{" "}
          <span
            style={{
              color: data?.bookingStatus === "booked" ? "green" : "red",
              
            }}
          >
            {data?.bookingStatus}
          </span>
        </h5>
      </div>
    </div>
  );
};

export default BookingHistoryCard;
