import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RoomCard from "./roomCard";
import { Navigate } from "react-router-dom";
import MarqueeCard from "../home/MarqueeCard";
import { filterdhouses } from "../../../redux/features/actions/guestActions";
import { useAuth } from "../../../context/authContext";

const Recommended = () => {
  const {userData} = useAuth()
  const houseList = useSelector(
    (state) => state.guestReducer?.houses?.recommended
  );

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(filterdhouses({ GuestId: userData?._id }))
  },[])

  return (
    <div className="recommended-section">
      <p className="recommended-title">Recommended For You ↘</p>
      <div className="recommended-marquee-container">
        <div className="recommended-marquee-cnt">
          {houseList?.map((house, index) => (
            <MarqueeCard houseData={house} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Recommended;
