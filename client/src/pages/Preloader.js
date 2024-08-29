import React, { useEffect } from "react";
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
  }, [value]);

  return (
    <div className="preloader-cnt" id="preloader">
      <img
      alt=""
        id="img-1"
        src={assets.Images.logo_white}
        className="preloader-img"
      />
      <img
      alt=""
        id="img-2"
        src={assets.Images.logo_Black}
        className="preloader-img"
      />
    </div>
  );
};

export default Preloader;
