import React from "react";
import assets from "../../../assets/assets";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";

const Page4AnimatedCard = ({ houseData }) => {
  const navigate = useNavigate()
  let Data = {houseData}
  return (
    <div className="apartment-card-pg4">
      <img
        src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          borderRadius: "2rem",
        }}
      />
      <div className="absolute-data-cnt">
        <div className="absolute-data-left">
          <h4 style={{ fontSize: "1.2rem", fontWeight: "400" }}>
            {houseData?.name?.title}
          </h4>
          <h5 style={{ fontSize: "1rem", fontWeight: "400" }}>
            {houseData?.address?.city}
          </h5>
        </div>
        <div className="absolute-data-right">
          <h4 style={{ fontSize: "1.8rem", fontWeight: "400" }}>
            $ {houseData?.rentPerDay}
          </h4>
          <div className="absolute-data-right-btn" onClick={()=>navigate('/properties/room-details',{ state: { data: Data } })}>
            <p>More</p>
            <img
              src={assets.Images.up_arrow}
              style={{
                width: "30%",
                height: "80%",
                objectFit: "contain",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page4AnimatedCard;
