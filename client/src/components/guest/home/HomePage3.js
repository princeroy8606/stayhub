import React, { useEffect } from "react";
import assets from "../../../assets/assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useNavigate } from "react-router-dom";

const HomePage3 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let t2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".pg3-bg",
        start: "top bottom",
        end: "30% 80%",
        scrub: 1,
      },
    });

    t2.from(".pg3-bg", {
      yPercent: "50",
      duration: 2,
    });
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="home-mid-cnt">
      <div className="content-cover-pg3">
        <div className="data-bottom-pg">
          <div className="counts-cnt-pg3">
            <div className="count">
              <h1 className="count-text"> 25K+</h1>
              <h3 className="count-text-small">Bookings</h3>
            </div>
            <div className="count">
              <h1 className="count-text">30K+</h1>
              <h3 className="count-text-small">Accomodations</h3>
            </div>
            <div className="count">
              <h1 className="count-text">10K+</h1>
              <h3 className="count-text-small">Customers</h3>
            </div>
          </div>
          <div className="pg3-discription-cnt">
            <p
              className="count-text-small"
              style={{
                fontSize: "1rem",
                fontWeight: "400",
                textAlign: "justify",
              }}
            >
              Experience the ultimate satisfaction in rental searching with
              StayHub. We've streamlined the process to make finding your
              perfect rental easier than ever. Our intuitive interface allows
              you to effortlessly browse through our extensive listings, filter
              your search based on your preferences, and compare options with
              ease. Whether you're in the market for a cozy apartment or a
              spacious house, we have something to suit every need. What truly
              sets us apart is our dedication to customer satisfaction. With our
              easy cancellation and 100% refund policy, you can book with
              confidence, knowing that your needs are our top priority. Don't
              settle for a frustrating rental search – make it easier and more
              satisfying with StayHub. Start your search today and discover the
              difference!
            </p>
          </div>
          <div className="pg3-btn" onClick={() => navigate("/about-us")}>
            <h3
              className="count-text-small"
              style={{ color: "white", width: "50%" }}
            >
              About Us
            </h3>
            <img alt=""
              src={assets.Images.up_arrow}
              style={{ width: "12%", height: "100%", objectFit: "contain" }}
            />
          </div>
        </div>
        <img alt="" src={assets.Images.bg_homePage3} className="pg3-bg" />
      </div>
    </div>
  );
};

export default HomePage3;
