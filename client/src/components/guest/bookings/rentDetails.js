import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
// import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../../../context/authContext";
// import { usePopupWithTimeout } from "../../../hooks/customHook";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
// import { newBooking } from "../../../redux/features/actions/guestActions";
import GuestTypesCard from "../properties/guestTypesCard";

const RentDetails = ({ RentData }) => {
  const { userData } = useAuth();
  const Navigate = useNavigate();
  // const dispatch = useDispatch();
  const [isGuestCardOpen, setIsGuestCardOpen] = useState(false);
  // const [totalAmount, setTotalAmout] = useState(null);
  // const [popUp, setPopUp] = useState(false);
  const [Error, setError] = useState("");
  const [dateValues, setDateValues] = useState({
    from: null,
    to: null,
  });
  const [guestDetails, setGuestDetails] = useState({
    adults: RentData?.data?.GuestCount || 1,
    childrens: 0,
    infants: 0,
    pets: 0,
  });
  useEffect(() => {
    if (RentData?.data?.fromDate && RentData?.data?.toDate) {
      setDateValues({
        from: dayjs(RentData?.data?.fromDate),
        to: dayjs(RentData?.data?.toDate),
      });
    }
  }, [RentData]);

  const minday = dateValues?.from?.add(1, "day");
  const handleFromDate = (pickedDate) => {
    setError(null);
    setDateValues({ from: pickedDate, to: dateValues.to });
  };

  const increaseCount = (type) => {
    setGuestDetails((prevValues) => ({
      ...prevValues,
      [type]: guestDetails[type] + 1,
    }));
  };
  const decreaseCount = (type) => {
    setGuestDetails((prevValues) => ({
      ...prevValues,
      [type]: guestDetails[type] - 1,
    }));
  };

  let guestData = {
    Adults: guestDetails?.adults,
    Childrens: guestDetails?.childrens,
    Infants: guestDetails?.infants,
    Pets: guestDetails?.pets,
  };

  let noofdays;
  const totalCalculation = () => {
    if (dateValues.to && dateValues.from) {
      noofdays =
        (new Date(dateValues.to) - new Date(dateValues.from)) /
        (24 * 60 * 60 * 1000);
      return RentData.amount * noofdays;
    }
  };

  const handleUpdateDate = (value) => {
    setError(null);
    setDateValues((prevState) => ({
      ...prevState,
      to: value,
    }));
  };

  const handleBooking = () => {
    if (dateValues.to && dateValues.from) {
      if (userData) {
        Navigate("guest-details", {
          state: {
            data: {
              GuestId: userData?._id,
              FromDate: dateValues.from,
              ToDate: dateValues.to,
              HouseId: RentData?.houseId,
              GuestCount: guestDetails?.adults + guestData?.Childrens,
              houseData: RentData?.houseDetails,
            },
          },
        });
      } else {
        Navigate("/landing");
      }
      // console.log("dispatched")
      // dispatch(
      //   newBooking({
      // GuestId: userData?._id,
      // FromDate: dateValues.from,
      // ToDate: dateValues.to,
      // HouseId: RentData?.houseId,
      // GuestCount: guestDetails?.adults + guestData?.Childrens,
      //   })
      // );
    } else {
      setError("date");
    }
  };

  return (
    <div className="details-right">
      <div className="price-raiting-cnt">
        <div className="house-rent-txt">
          {RentData?.amount} <span>night</span>
        </div>
        <div className=" card-width">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="black"
            viewBox="0 0 24 24"
            strokeWidth={1.8}
            stroke="currentColor"
            className="raiting-star"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
            />
          </svg>
          <span>
            4.3.<span className="review-count">196 reviews</span>
          </span>
        </div>
      </div>
      {/* {popUp && (
        <div className="Pop-Up-cnt">
          <h6>Room Booked successfully</h6>
        </div>
      )} */}
      <div className="rent-details">
        <div className="dates-cnt">
          <div className="filter-item booking-card-filter-item">
            <DatePicker
              value={dateValues.from}
              format="DD/MM/YYYY"
              disablePast
              formatDensity="spacious"
              maxDate={dayjs(new Date().setFullYear(new Date().getFullYear() + 1))}

              sx={{
                "& .MuiOutlinedInput-root": {
                  fieldset: { borderColor: "white" },
                  "&:hover > fieldset": { borderColor: "white" },
                  height: "48px",
                  borderRadius: "6px",
                },
              }}
              onChange={(newValue) => handleFromDate(newValue)}
              slotProps={{
                openPickerIcon: { fontSize: "small" },
                openPickerButton: {
                  color: Error === "date" ? "error" : "success",
                },
                textField: {
                  color: "success",
                  inputProps: {},
                },
              }}
            />
          </div>
          <div className="filter-item booking-card-filter-item">
            <DatePicker
              value={dateValues.to}
              format="DD/MM/YYYY"
              disablePast
              formatDensity="spacious"
              minDate={minday}
              maxDate={dayjs(new Date().setFullYear(new Date().getFullYear() + 1))}

              sx={{
                "& .MuiOutlinedInput-root": {
                  fieldset: { borderColor: "white" },
                  "&:hover > fieldset": { borderColor: "white" },
                  height: "48px",
                  borderRadius: "6px",
                },
              }}
              slotProps={{
                openPickerIcon: { fontSize: "small" },
                openPickerButton: {
                  color: Error === "date" ? "error" : "success",
                },
                textField: {
                  color: "success",
                },
              }}
              onChange={(newValue) => handleUpdateDate(newValue)}
            />
          </div>
        </div>
        <div className="guest-counts-cnt">
          <div
            className="details-display-cnt"
            onClick={() => setIsGuestCardOpen(!isGuestCardOpen)}
          >
            <div>GUESTS</div>
            <div className="details-display">
              {" "}
              {guestDetails?.adults + guestData?.Childrens} guests,
            </div>
          </div>
          {isGuestCardOpen ? (
            <GuestTypesCard
              guestData={guestData}
              IncreaseCount={increaseCount}
              DecreaseCount={decreaseCount}
              style={{ top: "110%", left: '0%' ,boxShadow:' 0px 1px 2px 0px #4f4f4f'}}
            />
          ) : null}
        </div>
      </div>
      {Error && <p style={{ color: "red" }}>{Error} is missing </p>}
      <div
        className="booking-btn"
        style={{
          pointerEvents: Error ? "none" : "auto",
          backgroundColor: Error ? "#7da640" : null,
        }}
        onClick={handleBooking}
        // onClick={()=>Navigate('/guest-details')}
      >
        BookNow
      </div>
      <div className="display-amount-cnt">
        <div className="amount-details">
          <div>
            {RentData?.amount} * {noofdays}nights
          </div>
          <div>₹{totalCalculation()}</div>
        </div>
        <div className="amount-details">
          <div>Process fee</div>
          <div> ₹ 500</div>
        </div>
        <div className="amount-details">
          <h4>Total before taxes</h4>
          <h4> ₹{totalCalculation() + 500}</h4>
        </div>
      </div>
    </div>
  );
};

export default RentDetails;
