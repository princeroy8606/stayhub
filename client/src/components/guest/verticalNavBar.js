import React from "react";
import { useAuth } from "../../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import assets from "../../assets/assets";

const VerticalNavBar = ({ theme, img }) => {
  const { userData } = useAuth();
  const Navigation = useNavigate();
  const location = useLocation();

  const setPathStyle = (path) => {
    return {
      backgroundColor: location?.pathname === path ? "#ffffff" : null,
      color: location?.pathname === path ? "black" : theme,
      fontWeight: location?.pathname === path ? 600 : null,
    };
  };

  return (
    <div className="nav">
      <div className="nav-cover">
        <div>
          <img
          alt=""
            src={
              img === "black"
                ? assets.Images.logo_Black
                : assets.Images.logo_white
            }
            onClick={() => Navigation("/")}
            className="nav-img"
          />
          {/* <p>@_StayHub</p> */}
        </div>
        <div className="nav-cneter" style={{ width: !userData && "30%" }}>
          <div
            className="nav-cneter-item"
            onClick={() => Navigation("/")}
            style={setPathStyle("/")}
          >
            Home
          </div>
          <div
            className="nav-cneter-item"
            onClick={() => Navigation("/properties")}
            style={setPathStyle("/properties")}
          >
            Properties
          </div>
          <div
            className="nav-cneter-item"
            onClick={() => Navigation("/about-us")}
            style={setPathStyle("/about-us")}
          >
            <p>About Us</p>
          </div>

          {userData && (
            <div
              className="nav-cneter-item"
              onClick={() => Navigation("/myBookings")}
              style={setPathStyle("/myBookings")}
            >
              <p>My Bookings</p>
            </div>
          )}

          {userData && (
            <div
              className="nav-cneter-item"
              onClick={() => Navigation("/myWishList")}
              style={setPathStyle("/myWishList")}
            >
              <p>My WishList</p>
            </div>
          )}
        </div>
        {userData ? (
          <div
            className="profile-icon"
            onClick={() => Navigation("/profile")}
            style={{ background: theme }}
          >
            <p style={{ color: theme === "black" ? "white" : theme }}>
              {userData?.name}
            </p>
          </div>
        ) : (
          <div
            className="profile-icon"
            onClick={() => Navigation("/landing")}
            style={{ background: theme }}
          >
            <p style={{ color: theme === "black" ? "white" : theme }}>
              Login / SignUp
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerticalNavBar;
