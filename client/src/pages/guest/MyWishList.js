import React, { useEffect } from "react";
import VerticalNavBar from "../../components/guest/verticalNavBar";
import { Skeleton } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { WishList } from "../../redux/features/actions/guestActions";
import { useAuth } from "../../context/authContext";
import Footer from "../../components/global/Footer";
import RoomCard from "../../components/guest/properties/roomCard";
import Preloader from "../Preloader";

const MyWishList = () => {
  const { userData } = useAuth();
  const dispatch = useDispatch();
  const likedHouses = useSelector((state) => state?.guestReducer?.wishList);
  window.scrollTo(0, 0);

  useEffect(() => {
    console.log(userData);
    if (!likedHouses && userData) dispatch(WishList(userData?._id));
  }, [likedHouses, userData, dispatch]);

  return (
    <>
      <div
        className="landing-cont"
        style={{
          minHeight: "100vh",
          height: "fit-content",
          background: "white",
        }}
      >
        <Preloader value={"-100"} />
        <div style={{ height: "6rem", width: "100%" }}>
          <VerticalNavBar theme={"black"} img={"black"} />
        </div>
        <div className="bookings-cnt">
          <div className="bookings">
            <h1
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                color: "black",
                fontSize: "3rem",
              }}
            >
              Wishlists ↘
            </h1>
            {likedHouses ? (
              <div className="current-bookings history-booking">
                <div className="bookings-list">
                  {likedHouses?.map((house) => (
                    <RoomCard
                      houseData={house}
                      liked={true}
                      guestId={userData?._id}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bookings-list">
                <Skeleton
                  sx={{ bgcolor: "grey.600" }}
                  variant="rounded"
                  width={"18rem"}
                  height={"20rem"}
                  animation="wave"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MyWishList;
