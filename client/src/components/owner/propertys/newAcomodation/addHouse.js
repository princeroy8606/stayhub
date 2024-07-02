import React, { useCallback, useEffect, useState } from "react";
import assets from "../../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  getOwnerHouse,
  newHouse,
  reset,
} from "../../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../../context/authContext";
import { resetHouseResponse } from "../../../../redux/features/slices/ownerSlice";
import { usePopupWithTimeout } from "../../../../hooks/customHook";
import SelectAccType from "./selectAccType";
import AccAddress from "./AccAddress";
import AmenitiesDetatils from "./AmenitiesDetatils";
import { data } from "./amenitiList";
import UploadImage from "./UploadImage";
import TitleandDescription from "./TitleandDescription";
import AddAmount from "./AddAmount";
import { isValidPincode } from "../../../../utils/validityChecks";

const AddHouse = ({ handleCancel }) => {
  const [stepCount, setStepCount] = useState(1);
  const [houseName, setHouseName] = useState({
    title: null,
    description: null,
  });
  const [roomsInfo, setRoomsInfo] = useState(null);
  const [amenities, setAmenities] = useState(data);
  const [accImages, setACCImages] = useState([]);
  const [rentPerDay, setRentPerDay] = useState(5999);
  const [accType, setAccType] = useState(null);
  const [Error, setError] = useState(null);
  const [enableNext, setenableNext] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [address, setAddress] = useState({
    country: null,
    area: null,
    streetAddress: null,
    city: null,
    pincode: null,
    state: null,
  });

  const dispatch = useDispatch();
  const { userData } = useAuth();
  const response = useSelector((state) => state?.ownerReducer?.houseResponse);

  const handleAccTypeChnage = (data) => {
    if (accType !== data) setAccType(data);
    if (!accType) setenableNext(false);
    if (!enableNext) setenableNext(true);
  };

  const handleAddAddress = (data, key) => {
    setAddress((prevdata) => ({ ...prevdata, [key]: data }));
    const hasEmptyFields = Object.values(address).some((value) => !value);
    setenableNext(!hasEmptyFields && isValidPincode(address?.pincode));
  };

  const UpdateCount = useCallback(
    (data) => {
      setRoomsInfo(data);
      setenableNext(true);
    },
    [setRoomsInfo]
  );

  const UpdateAmenities = useCallback(
    (data) => {
      setenableNext(true);
      setAmenities(data);
    },
    [setAmenities]
  );

  const AddImages = useCallback(
    (data) => {
      setenableNext(true);
      setACCImages((prevData) => [...prevData, ...data]);
    },
    [setACCImages]
  );

  useEffect(() => {
    if (houseName?.description && houseName?.title) {
      return setenableNext(true);
    } else {
      return setenableNext(false);
    }
  }, [houseName, rentPerDay]);

  const handleNext = () => {
    if (stepCount < 6) setStepCount(stepCount + 1);
    stepCount < 5 && setenableNext(false);
    stepCount === 6 && handleAddHouse();
  };

  const handleComponent = () => {
    switch (stepCount) {
      case 1:
        return (
          <SelectAccType
            accomodationType={accType}
            onChnage={handleAccTypeChnage}
          />
        );
      case 2:
        return <AccAddress setData={handleAddAddress} />;
      case 3:
        return (
          <AmenitiesDetatils
            updateCount={UpdateCount}
            updateAmenities={UpdateAmenities}
            amenitieDetails={amenities}
          />
        );
      case 4:
        return <UploadImage images={accImages} addImages={AddImages} />;
      case 5:
        return (
          <TitleandDescription
            handleDiscribtion={(txt) =>
              setHouseName((prevTxt) => ({ ...prevTxt, description: txt }))
            }
            handleTitle={(txt) => {
              setHouseName((prevTxt) => ({ ...prevTxt, title: txt }));
            }}
          />
        );
      case 6:
        return (
          <AddAmount
            rentAmount={rentPerDay}
            setRentAmount={(amt) => setRentPerDay(amt)}
          />
        );
    }
  };

  const handleAddHouse = () => {
    if (!houseName || !address || !rentPerDay) {
      setError("All details are required");
    } else {
      const formData = new FormData();
      accImages.forEach((image) => {
        formData.append("AccImages", image);
      });
      formData.append("Name", JSON.stringify(houseName));
      formData.append("Address", JSON.stringify(address));
      formData.append("RentPerDay", rentPerDay);
      formData.append("OwnerId", userData?._id);
      formData.append("RoomsInfo", JSON.stringify(roomsInfo));
      formData.append("Amenities", JSON.stringify(amenities));
      formData.append("AccType", accType);
      dispatch(newHouse(formData));
    }
  };

  usePopupWithTimeout(response === true, setPopUp, handleCancel, () => {
    dispatch(resetHouseResponse());
    dispatch(getOwnerHouse(userData?._id));
  });

  return (
    <div className="popUp-block" style={{ position: "absolute" }}>
      <div className="cancel-btn" onClick={() => handleCancel()}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      {popUp && (
        <div className="Pop-Up-cnt">
          <h6>New house has been added successfully</h6>
        </div>
      )}
      <div></div>
      {handleComponent()}
      <div className="popup-footer-cnt">
        <div onClick={() => setStepCount(stepCount - 1)}>Back</div>
        <div
          className="popup-footer-btn"
          style={{ backgroundColor: enableNext ? null : "gray" }}
          onClick={enableNext ? handleNext : null}
        >
          {stepCount <= 5 ? "Next" : "Finish"}
        </div>
      </div>
    </div>
  );
};

export default AddHouse;
