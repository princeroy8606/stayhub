// Importing necessary modules and components
import React from "react";
import { Link } from "react-router-dom";
import assets from "../../assets/assets";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <h1>StayHub</h1>
          <p>The home away from home</p>
        </div>
        <div className="footer-links">
          <p style={{ fontSize: "1.5rem", fontWeight: "300" }}>Navigation</p>
          <Link to="/">Home</Link>
          <Link to="/about-us">About Us</Link>
          <Link to="/services">Services</Link>
        </div>
        <div className="footer-links">
          <p style={{ fontSize: "1.5rem", fontWeight: "300" }}>Contact us</p>
          <p>24 Pasafic Avanue , India, </p>
          <p>princeroy8606@gmail.com</p>
          <p>Ph: 8606340493</p>
        </div>
        <div style={{ width: "fit-content" }}>
          <div className="social-icons" style={{ alignSelf: "flex-end" }}>
            <p style={{ fontSize: "1.5rem", fontWeight: "300" }}>
              Follow us on
            </p>
            <a href="#" className="social-icon">
              <i className="fab fa-facebook">
                <img src={assets.Images.facebook} className="social-icon-img" />
              </i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter">
                <img src={assets.Images.twitter} className="social-icon-img" />
              </i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram">
                <img
                  src={assets.Images.instagram}
                  className="social-icon-img"
                />
              </i>
            </a>
          </div>
        </div>
      </div>
        <div className="footer-bottom">
            <p>2024 StayHub Inc. All rights reserved</p>
        </div>
    </div>
  );
};

export default Footer;
