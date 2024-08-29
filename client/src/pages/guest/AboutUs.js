import React, { useEffect, useState } from "react";
import VerticalNavBar from "../../components/guest/verticalNavBar";
import assets from "../../assets/assets";
import Footer from "../../components/global/Footer";
import Preloader from "../Preloader";
import CustomCursor from "../../components/guest/CustomCursor";

const AboutUs = () => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [activeImage, setActiveImage] = useState(1);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [showCursor, setShowCursor] = useState({
    show: false,
    name: null,
    designation: null,
  });

  useEffect(() => {
    setStartAnimation(true);
    window.scrollTo(0, 0);
  }, []);

  const handleMouseMove = (e) => {
    setCursorPosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseEnter = (img, name, designation) => {
    setActiveImage(img);
    setShowCursor({ show: true, name: name, designation: designation });
  };

  console.log(showCursor);

  const checkActiveStatus = (img) => {
    if (img === activeImage) return { width: "35%", filter: "grayscale(0%)" };
    return { width: "15%", filter: "grayscale(100%)" };
  };

  return (
    <div className="landing-cont">
      <Preloader value={"100"} img={"#img-2"} />
      <VerticalNavBar />
      <div className="about-us-img">
        <img alt="img"
          src={assets.Images.about_us_bg}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        <div className="about-us-textCnt">
          <h1
            className="about-us-mainText"
            style={{
              transform: startAnimation
                ? "translateX(0)"
                : "translateX(-100rem)",
              transition: "all 1s ease-in-out",
            }}
          >
            More Than Just Rentals , We Provide Comfort
          </h1>
          <p
            className="about-us-secondText"
            style={{
              transform: startAnimation
                ? "translateX(0)"
                : "translateX(-100rem)",
              transition: "all 2s ease-in-out",
            }}
          >
            Dive into the world of comfort and conveinience as we connect you
            the finest accomodations , ensure a perfect gateway tailored to your
            prefernecs
          </p>
        </div>
      </div>
      <div className="about-us-mid">
        <div style={{width:"82%", height:"90%", display:"flex", justifyContent:"space-between" , alignItems:"center"}}>
        <img alt="img" src={assets.Images.our_story} className="members-portrait-img" style={{width:"50%"}} />
        <div className="about-us-legacy">
          <h1
            className="about-us-mainText"
            style={{
              fontSize: "2rem",
              color: "black",
              fontWeight: "600",
              width: "auto",
            }}
          >
            Our Story ↘
          </h1>
          <p
            className="about-us-secondText"
            style={{
              fontSize: "1.3rem",
              color: "#4f4f4f",
              fontWeight: "400",
              textAlign: "center",
            }}
          >
            ❝ Our commitment at StayHub is to redefine your rental experience by
            offering the finest selection of accommodations tailored to your
            needs and preferences. From luxurious city apartments to cozy
            countryside retreats, each property in our curated collection
            promises a seamless blend of style, convenience, and relaxation.
            With a dedicated team ensuring quality and personalized service
            every step of the way, StayHub is your trusted partner for
            unforgettable getaways. Welcome to a world where comfort finds a
            home – welcome to StayHub, where your next adventure begins ❞
          </p>
        </div>
        </div>
      </div>
      <div className="members-cnt">
        <div className="members-cover">
          <h1>Our Team ↘</h1>
          <p>
            Welcome to our team! At StayHub, we believe in the power of
            collaboration and diversity. Each member of our team brings unique
            skills, experiences, and perspectives, enriching our work
            environment and driving innovation. Get to know the faces behind our
            projects below. From designers to developers, marketers to managers,
            we're passionate about what we do and committed to delivering
            excellence in every endeavor. Meet the individuals who make our team
            extraordinary.
          </p>
          <div className="members-img-cnt">
            <CustomCursor position={cursorPosition} show={showCursor} />
            <img alt="img"
              src={assets.Images.potrate_1}
              className="members-portrait-img"
              style={checkActiveStatus(1)}
              onMouseEnter={() => handleMouseEnter(1, "Rachel Race", "CEO")}
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={() => setShowCursor({ show: false })}
            />
            <img alt="img"
              src={assets.Images.potrate_2}
              className="members-portrait-img"
              style={checkActiveStatus(2)}
              onMouseEnter={() =>
                handleMouseEnter(2, "Shiang Chan", "Assistant CEO")
              }
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={() => setShowCursor({ show: false })}
            />
            <img alt="img"
              src={assets.Images.potrate_6}
              className="members-portrait-img"
              style={checkActiveStatus(3)}
              onMouseEnter={() =>
                handleMouseEnter(3, "Ammen Ahemmad", "Marketing Head")
              }
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={() => setShowCursor({ show: false })}
            />
            <img alt="img"
              src={assets.Images.potrate_4}
              className="members-portrait-img"
              style={checkActiveStatus(4)}
              onMouseEnter={() =>
                handleMouseEnter(4, "Nicko Parkor", "Human Resource")
              }
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={() => setShowCursor({ show: false })}
            />
            <img alt="img"
              src={assets.Images.potrate_7}
              className="members-portrait-img"
              style={checkActiveStatus(5)}
              onMouseEnter={() =>
                handleMouseEnter(5, "Hari Hanks", "Senior Developer")
              }
              onMouseMove={(e) => handleMouseMove(e)}
              onMouseLeave={() => setShowCursor({ show: false })}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
