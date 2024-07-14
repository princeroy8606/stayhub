import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import assets from "../assets/assets";

const Preloader = ({ value, img }) => {
  useEffect(() => {
    let cntx = gsap.context(() => {
      const t1 = gsap.timeline();
      t1.to('#img-1', {
        yPercent: "20",
        display: "block",
        duration: 0.5,
      }).to("#preloader", {
        xPercent: value,
        duration: 1.9,
        display:"none"
      });
    });
    return () => cntx.revert();
  }, []);
  return (
    <div className="preloader-cnt" id="preloader">
      <img
        id="img-1"
        src={assets.Images.logo_white}
        className="preloader-img"
      />
      <img
        id="img-2"
        src={assets.Images.logo_Black}
        className="preloader-img"
      />
    </div>
  );
};

export default Preloader;
