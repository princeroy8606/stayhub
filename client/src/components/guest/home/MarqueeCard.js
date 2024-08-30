import React from "react";
import { useNavigate } from "react-router-dom";

const MarqueeCard = ({ houseData }) => {
  const Navigate = useNavigate();
  const Data = { houseData };

  return (
    <div
      className="marquee-card"
      onClick={() => Navigate("room-details", { state: { data: Data } })}
    >
      <div className="marquee-card-img-cnt">
        <img
          src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
          className="house-img"
          alt="House"
        />
        <div className="marquee-card-overlay">
          <div className="transition-cnt">
            <h1>{houseData?.name?.title}</h1>
            <p>{houseData?.name?.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarqueeCard;
