import React, { useEffect } from "react";
import { useAuth } from "../../context/authContext";
import Footer from "../../components/global/Footer";
import GuestTop from "../../components/guest/properties/guestTop";
import Recommended from "../../components/guest/properties/Recommended";
import HouseList from "../../components/guest/properties/houseList";
import Preloader from "../Preloader";
import { useSelector } from "react-redux";

const Properties = () => {
  const { userData } = useAuth();
  const houseList = useSelector((state) => state.guestReducer?.houses);

  console.log(houseList)
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Preloader value={"100"} img={"#img-1"} />
      <GuestTop />
      {userData && houseList?.recommended.length > 0 ? <Recommended /> : null}
      <HouseList />
      <Footer />
    </>
  );
};

export default Properties;
