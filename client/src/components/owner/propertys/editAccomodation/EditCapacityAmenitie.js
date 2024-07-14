import React, { useState } from "react";
import assets from "../../../../assets/assets";
import AccRoomsCount from "../newAcomodation/AccRoomsCount";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/authContext";
import { editHouse } from "../../../../redux/features/actions/ownerActions";

const EditCapacityAmenitie = ({ data, handleCancel, houseId }) => {
  const [basicCount, setBasicCount] = useState({
    guests: data?.capacity?.guests,
    bedrooms: data?.capacity?.bedrooms,
    beds: data?.capacity?.beds,
    bathrooms: data?.capacity?.bathrooms,
  });
  const [amenitie, setAmenities] = useState(data?.aminities);
  const dispatch = useDispatch();
  const { userData } = useAuth();

  const chnageAvailability = (type) => {
    const newData = amenitie.map((amenitie) => {
      if (amenitie?.amenitie === type) {
        return {
          ...amenitie,
          available: !amenitie?.available,
        };
      } else {
        return amenitie;
      }
    });
    setAmenities(newData);
  };

  const increaseCount = (type) => {
    setBasicCount((prevValues) => ({
      ...prevValues,
      [type]: basicCount[type] + 1,
    }));
  };

  const decreaseCount = (type) => {
    setBasicCount((prevValues) => ({
      ...prevValues,
      [type]: basicCount[type] - 1,
    }));
  };

  const checkChange = () => {
    const oldData = data?.capacity;
    if (
      oldData?.guests !== basicCount?.guests ||
      oldData?.bedrooms !== basicCount?.bedrooms ||
      oldData?.beds !== basicCount?.beds ||
      oldData?.bathrooms !== basicCount?.bathrooms
    )
      return true;

    for (let index = 0; index < data.aminities.length; index++) {
      if (data.aminities[index]?.available !== amenitie[index]?.available) {
        return true;
      }
    }
    return false;
  };

  let guestData = {
    guests: basicCount?.guests,
    bedrooms: basicCount?.bedrooms,
    beds: basicCount?.beds,
    bathrooms: basicCount?.bathrooms,
  };

  const handleSave = () => {
    checkChange() &&
      dispatch(
        editHouse({
          data: { Capacity: basicCount, Amenities: amenitie },
          houseId: houseId,
          AdminId: userData?._id,
        })
      );
  };

  return (
    <div className="popUp-block" style={{ position: "absolute", zIndex: 5 }}>
      <div className="cancel-btn" onClick={() => handleCancel()}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      <div></div>
      <div className=" acc-amenities-cnt">
        <h3>Share some basics about The place</h3>
        <AccRoomsCount
          guestData={guestData}
          IncreaseCount={increaseCount}
          DecreaseCount={decreaseCount}
        />
        <div className="acc-amenities-cover">
          <h3>Place has to offer</h3>
          <div className="acc-amenities">
            {amenitie?.map((item, index) => (
              <div
                className="acc-amenitie"
                onClick={() => chnageAvailability(item?.amenitie)}
                style={{ border: item?.available ? "2px solid black" : null }}
                key={index}
              >
                <img src={item?.icon} className="acc-amenities-svg" />
                <div>{item?.amenitie}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="popup-footer-cnt">
        <div
          className="popup-footer-btn"
          style={{ backgroundColor: checkChange() ? "black" : "gray" }}
          onClick={handleSave}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditCapacityAmenitie;
