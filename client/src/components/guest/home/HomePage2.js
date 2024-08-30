import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import assets from "../../../assets/assets";
import { useNavigate } from "react-router-dom";

const HomePage2 = () => {
  const navigate = useNavigate();
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let t1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".features-head",
        start: "top 70%",
        end: "bottom 30%",
        scrub: 1,
      },
    });
    t1.from(".features-head", {
      y: 0,
      xPercent: "-50",
      opacity: 0,
      duration: 5,
    }).from([".card-1, .card-2, .card-3"], {
      y: 10,
      xPercent: "-20",
      opacity: 0,
      duration: 5,
      stagger: 2,
      delay: 1,
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home-mid-cnt">
      <div className="features-head">
        <h1 style={{ fontSize: "4rem", fontWeight: "800", color: "black" }}>
          Explore Our Rental Haven Unmatched Features Await
        </h1>
      </div>

      <div className="features-card-cnt">
        <div className="features-card card-1">
          <div className="features-top-icon">
            <img
            alt=""
              src={assets.Images.booking_Icon}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <h2>Seamless Bookings</h2>
          <p style={{ color: "gray", height: "40%" }}>
            Experience seamless booking on our website. Our user-friendly
            interface ensures a smooth and hassle-free process. With just a few
            clicks, you can select and confirm your booking without any
            complications
          </p>
          <div className="feature-btn" onClick={() => navigate("/properties")}>
            <h3 style={{ fontWeight: "400" }}>Explore</h3>
          </div>
        </div>
        <div className="features-card card-2">
          <div className="features-top-icon">
            <img
            alt=""
              src={assets.Images.recomendation}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <h2>Recommendations</h2>
          <p style={{ color: "gray", height: "40%" }}>
            Enjoy personalized recommendations based on your preferences. Our
            website analyzes your past bookings to suggest tailored options that
            match your interests and needs.
          </p>
          <div className="feature-btn" onClick={() => navigate("/properties")}>
            <h3 style={{ fontWeight: "400" }}>Explore</h3>
          </div>
        </div>
        <div className="features-card card-3">
          <div className="features-top-icon">
            <img
            alt=""
              src={assets.Images.refund}
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>
          <h2>Easy Cancellation</h2>
          <p style={{ color: "gray", height: "40%" }}>
            Easily cancel your booking and get a 100% refund. We understand
            plans can change, so we've made cancellation simple and
            straightforward.
          </p>
          <div className="feature-btn" onClick={() => navigate("/properties")}>
            <h3 style={{ fontWeight: "400" }}>Explore</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage2;
