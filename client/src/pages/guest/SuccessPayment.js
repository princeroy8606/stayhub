import React from "react";
import assets from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const SuccessPayment = () => {
  const Navigate = useNavigate();
  return (
    <div className="payment-succes-page">
      <img
      alt="img"
        src={assets.Images.success_payment}
        className="payment-success-img"
      />
      <div className="success-center-cnt">
        <img  alt="img" src={assets.Images.success_Gif} className="success-gif" />
        <div className="success-text">The Payment Is Successfull</div>
        <div className="home-btn" onClick={() => Navigate("/")}>
          Back To Home
        </div>
      </div>
    </div>
  );
};

export default SuccessPayment;
