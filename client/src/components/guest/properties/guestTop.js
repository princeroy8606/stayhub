import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import assets from "../../../assets/assets";
import VerticalNavBar from "../verticalNavBar";
import { DatePicker } from "@mui/x-date-pickers";
import GuestTypesCard from "./guestTypesCard";
import { filterdhouses } from "../../../redux/features/actions/guestActions";
import dayjs from "dayjs";
import { useAuth } from "../../../context/authContext";
import { toast } from "react-toastify";

const GuestTop = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const houseList = useSelector((state) => state.guestReducer?.houses);
  const [dateValues, setDateValues] = useState({ from: null, to: null });
  const [location, setLoaction] = useState(houseList?.searchData?.Location);
  const [isGuestCardOpen, setIsGuestCardOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    adults: houseList?.searchData?.GuestCount || 1,
    childrens: 0,
    infants: 0,
    pets: 0,
  });

  const handleFromDate = (pickedDate) => {
    setDateValues({ from: pickedDate, to: dateValues.to });
  };

  const minday = dateValues?.from?.add(1, "day");

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

  let GuestCount = {
    Adults: guestDetails?.adults,
    Childrens: guestDetails?.childrens,
    Infants: guestDetails?.infants,
    Pets: guestDetails?.pets,
  };

  useEffect(() => {
    if (!houseList) dispatch(filterdhouses({ GuestId: userData?._id }));
    if (houseList) setIsLoading(false);
    if (houseList?.searchData) {
      setDateValues({
        from: dayjs(houseList?.searchData?.fromDate),
        to: dayjs(houseList?.searchData?.toDate),
      });
    }
  }, [houseList]);

  const handleSearch = () => {
    if (!location && dateValues.to.$d.toString() === "Invalid Date") {
      return toast.warning("No Queries to Search");
    }
    setIsLoading(true);
    dispatch(
      filterdhouses({
        Location: location,
        FromDate: dateValues.from,
        ToDate: dateValues.to,
        GuestCount: guestDetails?.adults + guestDetails?.childrens,
        GuestId: userData?._id,
      })
    );
    setIsGuestCardOpen(false);
  };

  return (
    <>
      <VerticalNavBar img={'black'} />
      <div className="guest-center">
        <div className="guest-img-cnt">
          <img
            src={assets.Images.bg_img_2}
            className="guest-img"
            alt="guest-main-img"
          />
          <div className="guest-search-cnt">
            <div className="guest-search-cover">
              <div className="transparent-curve"></div>
              <div className="transparent-curve-bottom"></div>
            </div>
          </div>
          <div className="search-cnt">
            <div className="filter-item">
              <input
                type="text"
                className="search-location-input"
                placeholder="Search loaction"
                style={{ color: "#bcbef7" }}
                value={location}
                onChange={(e) => setLoaction(e.target.value)}
              />
            </div>
            <div className="filter-item">
              <DatePicker
                value={dateValues?.from}
                format="DD/MM/YYYY"
                disablePast
                label="From Date"
                formatDensity="spacious"
                maxDate={dayjs(new Date().setFullYear(new Date().getFullYear() + 1))}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    fieldset: { borderColor: "white" },
                    "&:hover > fieldset": { borderColor: "black" },
                    height: "48px",
                    borderRadius: "6px",
                  },
                  "& .css-s653fb-MuiFormLabel-root-MuiInputLabel-root.Mui-error":
                    {
                      color: "white",
                    },

                  "& .css-1f6qayz-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white",
                    },
                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    color: "#989cfa",
                  },
                }}
                onChange={(newValue) => handleFromDate(newValue)}
                slotProps={{
                  openPickerIcon: { fontSize: "small" },
                  openPickerButton: { color: "primary" },
                  textField: {
                    color: "primary",
                    inputProps: {},
                  },
                }}
              />
            </div>
            <div className="filter-item">
              <DatePicker
                value={dateValues.to}
                format="DD/MM/YYYY"
                disablePast
                formatDensity="spacious"
                label="To Date"
                minDate={minday}
                maxDate={dayjs(new Date().setFullYear(new Date().getFullYear() + 1))}

                sx={{
                  "& .MuiOutlinedInput-root": {
                    fieldset: { borderColor: "white" },
                    "&:hover > fieldset": { borderColor: "black" },
                    height: "48px",
                    borderRadius: "6px",
                  },
                  "& .css-s653fb-MuiFormLabel-root-MuiInputLabel-root.Mui-error":
                    {
                      color: "white",
                    },

                  "& .css-1f6qayz-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: "white",
                    },
                  "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                    color: "#989cfa",
                  },
                }}
                slotProps={{
                  openPickerIcon: { fontSize: "small" },
                  openPickerButton: { color: "primary" },
                  textField: {
                    color: "primary",
                  },
                }}
                onChange={(newValue) =>
                  setDateValues((prevState) => ({
                    ...prevState,
                    to: newValue,
                  }))
                }
              />
            </div>
            <div className="filter-item">
              <div
                className="guest-filter"
                onClick={() => setIsGuestCardOpen(!isGuestCardOpen)}
                style={{ color: "#989cfa" }}
              >
                Guests
              </div>
            </div>
            {isGuestCardOpen ? (
              <GuestTypesCard
                guestData={GuestCount}
                IncreaseCount={increaseCount}
                DecreaseCount={decreaseCount}
              />
            ) : null}
            <div className="search-btn" onClick={handleSearch}>
              {isLoading ? (
                <img
                  style={{ width: "50%", height: "90%", objectFit: "contain" }}
                  src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
                />
              ) : (
                <h3>Search</h3>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuestTop;
