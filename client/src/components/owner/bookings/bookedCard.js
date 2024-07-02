import React from "react";
import { dateCalculator } from "./dateCalculator";

const BookedCard = ({ data, openPopUP }) => {
  const date = dateCalculator(data?.date);
  const checkStatus = (status)=>{
    if(status === "pending") return "#132146"
    if(status === "booked") return "green"
    if(status === "Canceled") return "#f54242"
  }
  return (
    <div className="booked-card-cnt">
      <p className="booked-list-item" style={{color:"Graytext"}}>{data?.customerName}</p>
      <p className="booked-list-item" style={{color:"Graytext"}}>{date}</p>
      <p className="booked-list-item" style={{color:"Graytext"}}>{data?.totalAmount}</p>
      <p className="booked-list-item" style={{color:checkStatus(data?.bookingStatus)}}>{data?.bookingStatus}</p>
      <p className="booked-list-item" style={{textDecoration:"underline",color:"#7575A2"}} onClick={() => openPopUP()}>more</p>
    </div>
  );
};

export default BookedCard;
