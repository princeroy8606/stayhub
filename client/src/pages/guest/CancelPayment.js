import React from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const CancelPayment = () => {
  const Navigate = useNavigate();
  return (
    <div className="payment-succes-page">
      <img alt="img"
        src={assets.Images.success_payment}
        className="payment-success-img"
      />
      <div className="success-center-cnt">
        <img alt="img" src={assets.Images.cancel_Gif} className="success-gif" />
        <div className="success-text" style={{color:"red"}}>The Payment Is Cancelled </div>
        <div className="home-btn" onClick={() => Navigate("/")}>
          Back To Home
        </div>
      </div>
    </div>
  );
};

export default CancelPayment;
