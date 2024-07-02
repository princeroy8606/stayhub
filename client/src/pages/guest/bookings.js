import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import assets from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../context/authContext";
import { bookingHistory } from "../../redux/features/actions/guestActions";
import VerticalNavBar from "../../components/guest/verticalNavBar";
import BookingHistoryCard from "../../components/guest/bookings/bookingHistoryCard";
import { Skeleton } from "@mui/material";
import DetailsPopUp from "../../components/guest/bookings/DetailsPopUp";
import Footer from "../../components/global/Footer";
import Preloader from "../Preloader";

const Bookings = () => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const [historyData, setHistoryData] = useState(null);
  const { userData } = useAuth();
  let userId = userData?._id

  const [popupShown, setpopupShown] = useState({ isopen: false, data: null });

  const scrollContainerRef = useRef(null);
  const popUpRef = useRef(null);

  const history = useSelector(
    (state) => state?.guestReducer?.bookingHistory
  )

  useEffect(() => {
    if (userData) dispatch(bookingHistory(userData?._id));
  }, [userData]);

  const checkCurrent = (toDate) => {
    const today = new Date();
    return new Date(toDate) > new Date(today);
  };

  useEffect(() => {
    const handleClick = (event) => {
      if (popUpRef.current && event?.target === popUpRef.current) {
        setpopupShown({ isopen: false, data: null });
        dispatch(bookingHistory(userId));
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [popUpRef]);

  useEffect(() => {
    if (history) {
      let data = [...history]?.reverse()
      setHistoryData(data);
    }
  }, [history]);

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
        <Preloader value={"100"} />
        <div style={{ height: "6rem", width: "100%" }}>
          <VerticalNavBar theme={"black"} img={"black"} />
        </div>
        <div className="bookings-cnt" ref={scrollContainerRef}>
          <div className="bookings">
            <h2
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                color: "black",
                fontSize: "2.5rem",
              }}
            >
              Current Bookings ↘
            </h2>
            {historyData ? (
              <div className="current-bookings history-booking">
                <div className="bookings-list">
                  {historyData?.map(
                    (booking, index) =>
                      checkCurrent(booking.toDate) && (
                        <BookingHistoryCard
                          data={booking}
                          key={index}
                          handleFun={() =>
                            setpopupShown({ isopen: true, data: booking })
                          }
                        />
                      )
                  )}
                  {/* {
                    history?.length  !== 0 && <h1>No Current Bookings</h1>
                  } */}
                </div>
              </div>
            ) : (
              <div className="bookings-list">
                <Skeleton
                  sx={{ bgcolor: "grey.400" }}
                  variant="rounded"
                  width={"30rem"}
                  height={"15rem"}
                  animation="wave"
                />
                <Skeleton
                  sx={{ bgcolor: "grey.400" }}
                  variant="rounded"
                  width={"30rem"}
                  height={"15rem"}
                  animation="wave"
                />
              </div>
            )}
            <h2
              style={{
                marginTop: "2rem",
                marginBottom: "2rem",
                color: "black",
                fontSize: "2.5rem",
              }}
            >
              Past Bookings ↘
            </h2>
            {historyData? (
              <div className="current-bookings history-booking">
                <div className="bookings-list">
                  {historyData?.map(
                    (booking, index) =>
                      !checkCurrent(booking.toDate) && (
                        <BookingHistoryCard
                          data={booking}
                          key={index}
                          handleFun={() =>
                            setpopupShown({ isopen: true, data: booking })
                          }
                        />
                      )
                  )}
                </div>
              </div>
            ) : (
              <div className="bookings-list">
                <Skeleton
                  sx={{ bgcolor: "grey.400" }}
                  variant="rounded"
                  width={"30rem"}
                  height={"15rem"}
                  animation="wave"
                />
                <Skeleton
                  sx={{ bgcolor: "grey.400" }}
                  variant="rounded"
                  width={"30rem"}
                  height={"15rem"}
                  animation="wave"
                />
              </div>
            )}
          </div>
          {/* {popupShown?.isopen && ( */}
          <div
            ref={popUpRef}
            style={{
              position: "fixed",
              top: "0rem",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(15px)",
              transform: popupShown.isopen ? "scale(1)" : "scale(0)",
              opacity: popupShown.isopen ? 1 : 0,
              transition:
                "transform 0.3s ease-in-out, opacity 0.3s ease-in-out",
            }}
          >
            <DetailsPopUp bookingData={popupShown?.data} />
          </div>
          {/* )} */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Bookings;
