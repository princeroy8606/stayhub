import React from "react";
import { useNavigate } from "react-router-dom";

const HomeCard = ({ data }) => {
  const Navigate = useNavigate();
  return (
    <div
      className="bookings-card dashboard-item"
      onClick={() => Navigate("edit-room", { state: { data: data } })}
      style={{ width: "48%" }}
    >
      <img
        src={`${process.env.REACT_APP_BASEURL}${data?.images[0]?.url}`}
        alt={data?.images[0]?.filename}
        className="bookings-img"
      />
      <div className="bookings-card-right">
        <h2 className="dashboard-head-text">{data?.name?.title}</h2>
        <h4 style={{ fontWeight: 400 }}>{data?.accType}</h4>
        <h5 style={{ fontWeight: 400 }}>{data?.address?.area}</h5>
        <h5 style={{ fontWeight: 400 }}>capacity: {data?.capacity?.guests}</h5>
        <h5 style={{ fontWeight: 400 }}>Price: {data?.rentPerDay}/-</h5>
        <h4 style={{ fontWeight: 400, color: "#9699CA" }}>
          Rooms Available:
          <span style={{ color: "#80cb10" }}>{data?.capacity?.bedrooms}</span>
        </h4>
      </div>
    </div>
  );
};

export default HomeCard;
