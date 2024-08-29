import React, { useEffect } from "react";
import Footer from "../../components/global/Footer";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import VerticalNavBar from "../../components/guest/verticalNavBar";
import assets from "../../assets/assets";
import Preloader from "../Preloader";
import HomePage2 from "../../components/guest/home/HomePage2";
import HomePage3 from "../../components/guest/home/HomePage3";
import HomePage4 from "../../components/guest/home/HomePage4";
import { filterdhouses } from "../../redux/features/actions/guestActions";

const GuestHome = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const houseList = useSelector((state) => state.guestReducer?.houses);

  useEffect(() => {
    if (!houseList) dispatch(filterdhouses({ GuestId: userData?._id }));
    window.scrollTo(0, 0);
  }, [dispatch,houseList,userData?._id]);

  return (
    <div className="landing-cont guest-home-bg">
      <Preloader value={"-100"} img={"#img-1"} />
      <VerticalNavBar />
      <div className="guest-center">
        <div className="marquee-text-cnt">
          <p className="marquee-text">HOME AWAY FROM HOME</p>
          <p className="marquee-text">HOME AWAY FROM HOME</p>
          <p className="marquee-text">HOME AWAY FROM HOME</p>
          <p className="marquee-text">HOME AWAY FROM HOME</p>
        </div>
        <img
          src={assets.Images.properties_bg}
          className="guest-img"
          alt="guest-main-img"
        />
      </div>
      <HomePage2 />
      <HomePage3 />
      <HomePage4 />
      <Footer />
    </div>
  );
};

export default GuestHome;
