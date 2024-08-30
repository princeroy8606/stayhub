import React, { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import Page4AnimatedCard from "./Page4AnimatedCard";
import Marquee from "react-fast-marquee";
import gsap from "gsap";
import { useSelector } from "react-redux";

const HomePage4 = () => {
  const [testimonial, setTestimonial] = useState({ line: 0, show: false });
  const houseList = useSelector((state) => state.guestReducer?.houses);

  useEffect(() => {
    let time = gsap.timeline({
      scrollTrigger: {
        trigger: ".testimonial-lines",
        start: "top bottom",
        end: "center center",
        scrub: 1,
      },
    });
    time.from([".line-1,.line-2,.line-3"], {
      color: "gray",
      duration: 5,
      yPercent: "20",
      opacity: 0,
      stagger: 1,
    });

    return () => time.kill();
  }, []);

  const checkStatus = (line) => {
    if (testimonial.show && testimonial.line === line) return true;
    return false;
  };

  console.log(houseList)

  return (
    <div className="home-mid-cnt page-4">
      <div className="apartments-cnt-pg4">
        <div className="apartments-head">
          <h1 style={{ fontSize: "3rem", fontWeight: "500", color: "black" }}>
            Find Your perfect Match
          </h1>
        </div>
        <Marquee
          className="animated-apartment-cnt"
          autoFill={false}
          pauseOnHover
          direction="right"
          speed={200}
        >
          {houseList?.data.map((house, index) => (
            <Page4AnimatedCard houseData={house} />
          ))}
        </Marquee>
      </div>
      <div className="apartments-cnt-pg4 testimonial-cnt">
        <div className="testimonial-bage">Testimonials</div>
        <div className="testimonial-text">
          <div className="testimonial-lines line-1">
            <p>We make it easy for </p>
            <div className="testimonial-img-cnt">
              <img alt=""
                src={assets.Images.potrate_1}
                className="testimonial-img"
                onMouseEnter={() => setTestimonial({ line: 1, show: true })}
                onMouseLeave={() => setTestimonial({ line: 1, show: false })}
              />
              <div
                className="testimonial-discription"
                style={{
                  opacity: checkStatus(1) && "1",
                  top: "-15rem",
                  right: "-25rem",
                  borderRadius: " 2rem 2rem 2rem 0rem",
                  visibility: checkStatus(1) && "visible",
                }}
              >
                <p className="testimonial">
                  <span style={{ fontSize: "2rem" }}>❝ </span>Our rental
                  experience with StayHub was exceptional! The house we rented
                  was exactly what we needed - clean, comfortable, and
                  conveniently located.
                </p>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    color: "#a1a09d",
                  }}
                >
                  Tessa Jacob
                </p>
              </div>
            </div>
            <p>travelers</p>
          </div>

          <div className="testimonial-lines line-2">
            <p>and property </p>
            <div className="testimonial-img-cnt">
              <img alt=""
                src={assets.Images.potrate_3}
                className="testimonial-img"
                onMouseEnter={() => setTestimonial({ line: 2, show: true })}
                onMouseLeave={() => setTestimonial({ line: 2, show: false })}
              />
              <div
                className="testimonial-discription"
                style={{
                  opacity: checkStatus(2) && "1",
                  top: "-15rem",
                  left: "-25rem",
                  borderRadius: " 2rem 2rem 0rem 2rem",
                  visibility: checkStatus(2) && "visible",
                }}
              >
                <p className="testimonial">
                  <span style={{ fontSize: "2rem" }}>❝ </span>We recently stayed
                  at a property booked through StayHub and couldn't have been
                  happier. The house was beautiful and well-equipped, making our
                  vacation truly enjoyable.
                </p>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    color: "#a1a09d",
                  }}
                >
                  Sandeep S
                </p>
              </div>
            </div>
            <p>owners to discover, book and</p>
          </div>
          <div className="testimonial-lines line-3">
            <p>manage rental</p>
            <div className="testimonial-img-cnt">
              <img alt=""
                src={assets.Images.potrate_2}
                className="testimonial-img"
                onMouseEnter={() => setTestimonial({ line: 3, show: true })}
                onMouseLeave={() => setTestimonial({ line: 3, show: false })}
              />
              <div
                className="testimonial-discription"
                style={{
                  opacity: checkStatus(3) && "1",
                  bottom: "-15rem",
                  right: "-25rem",
                  borderRadius: " 0rem 2rem 2rem 2rem",
                  visibility: checkStatus(3) && "visible",
                }}
              >
                <p className="testimonial">
                  <span style={{ fontSize: "2rem" }}>❝ </span>Renting through
                  StayHub was a fantastic experience! The house we stayed in was
                  stunning, with modern amenities and a cozy vibe. Booking was
                  easy, and the team was super helpful
                </p>
                <p
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "500",
                    color: "#a1a09d",
                  }}
                >
                  John Doe
                </p>
              </div>
            </div>
            <p> experiences.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage4;
