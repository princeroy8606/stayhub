import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import GuestPreview from "../../components/guest/bookings/GuestPreview";
import { useDispatch } from "react-redux";
import { newBooking } from "../../redux/features/actions/guestActions";
import { CircularProgress } from "@mui/material";

const PayMent = () => {
  const dispatch = useDispatch()
  const [startBooking,setStartBooking] = useState(false)
  const { bookingData } = useLocation().state?.data;
  const { houseData } = bookingData?.bookingDetails;

  const getDate = (date) => {
    const originalDate = new Date(date);
    return `${originalDate.getDate()} - ${
      originalDate.getMonth() + 1
    } - ${originalDate.getFullYear()}`;
  };

  const dateDifference = (toDate, fromDate) => {
    return (new Date(toDate) - new Date(fromDate)) / (24 * 60 * 60 * 1000);
  };

  const totalAmount =
    houseData?.rentPerDay *
    dateDifference(
      bookingData?.bookingDetails?.ToDate?.$d,
      bookingData?.bookingDetails?.FromDate?.$d
    );

    const handleConform = ()=>{
      const formData = new FormData();
      formData.append("booking-data", JSON.stringify(bookingData));
      bookingData?.gusetDetails?.forEach((guest, index) => {
        formData.append("guest-address-proof", guest.proof);
      });
      dispatch(newBooking(formData));
      setStartBooking(true)
    }

  return (
    <div className="landing-cont booked-details-cnt">
      <div className="booked-details-bg-image-cnt">
        <img
          className="booked-details-bg-image"
          src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
        />
      </div>
      <div className="booked-house-details-cnt">
        <div className="booked-house-img-cnt gird-cnt">
          {/* <img
            src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
            alt="house"
            className="grid-top-img"
          /> */}
          <img
            src={`${process.env.REACT_APP_BASEURL}${houseData?.images[1]?.url}`}
            alt="house"
            className="grid-top-img"
            style={{ width: "100%" }}
          />
          <img
            src={`${process.env.REACT_APP_BASEURL}${houseData?.images[2]?.url}`}
            alt="house"
            className="grid-top-img"
            style={{ width: "100%" }}
          />
        </div>
        <div className="booked-house-img-cnt booked-house-info-cnt">
          <div className="booked-house-info-cover">
            <h1 style={{alignSelf:"center"}}>{houseData?.name?.title}</h1>
            <h4 style={{fontWeight:"500"}}>{houseData?.address?.area}, {houseData?.address?.state} , {houseData?.address?.country}</h4>
            <h4>{houseData?.accType}</h4>
            <h4>Guests : {bookingData?.bookingDetails?.GuestCount}</h4>
            <div className="booked-date-cnt">
              <h5>
                From : {getDate(bookingData?.bookingDetails?.FromDate?.$d)}
              </h5>
              <h5>To : {getDate(bookingData?.bookingDetails?.ToDate?.$d)}</h5>
            </div>
          </div>
          <div className="booked-house-info-cover">
            <h2>payment details</h2>
            <h5>Rent for One Day : {houseData?.rentPerDay}</h5>
            <h5>Rent Total : {totalAmount}</h5>
            <h5>Service Fee: 500</h5>
            <h3>Total: ₹ {Number(totalAmount) + 500}</h3>
          </div>
          <div className="cancel-booking-btn" style={{backgroundColor:"green"}} onClick={()=>handleConform()}>{startBooking ? <CircularProgress /> :"Conform Booking"} </div>
        </div>
        <div className="booked-house-raiting-cnt display-guest-details">
          {bookingData?.gusetDetails?.map((guest) => (
            <GuestPreview data={guest} />
          ))}
         {
          bookingData?.gusetDetails?.length < 1 &&  <img style={{width:"90%",height:"90%",objectFit:"cover",borderRadius:"1rem"}}  src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}/>
         }
        </div>
      </div>
    </div>
  );
};

export default PayMent;
