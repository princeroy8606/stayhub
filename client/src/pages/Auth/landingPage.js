import React, { useEffect, useState } from "react";
import "../../global.css";
// import assets from "../../assets/assets";
import RegisterCard from "./components/registerCard";
import LoginCard from "./components/loginCard";
import { useAuth } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import VerticalNavBar from "../../components/guest/verticalNavBar";
import Footer from "../../components/global/Footer";
import Preloader from "../Preloader";

const LandingPage = () => {
  const [authType, setAuthType] = useState("login");
  const { userData } = useAuth();
  const Navigate = useNavigate();

  useEffect(() => {
    console.log(userData);
    userData && Navigate("/");
  }, [userData,Navigate]);

  return (
    <div className="landing-cont">
      <Preloader value={"100"} img={"#img-1"} />
      <div style={{ width: "100%", height: "6rem" }}>
        <VerticalNavBar theme={"black"}  img={"black"}/>
      </div>
      <div className="landing-main">
        <div
          className="landing-main-right"
          style={{ width: authType === "login" ? "50%" : "100%" }}
        >
          {authType === "login" ? (
            <LoginCard setAuthType={() => setAuthType("register")} />
          ) : (
            <RegisterCard setAuthType={() => setAuthType("login")} />
          )}
        </div>
        <div
          className="landing-main-left"
          style={{ width: authType === "login" ? "50%" : 0 }}
        >
          <div className="landing-img-top">
            <img
            alt=""
              src="http://localhost:3000/static/media/landing.d6b37785edbe1888547b.jpg"
              className="login-img"
            />
            <div className="landing-img-center">
            {
              authType === 'login' &&   <h1 style={{fontWeight:"800"}}>-BEST EXP-</h1>
            }
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;
