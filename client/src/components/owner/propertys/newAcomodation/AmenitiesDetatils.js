import React, { useEffect, useState } from "react";
import AccRoomsCount from "./AccRoomsCount";

const AmenitiesDetatils = ({
  updateCount,
  updateAmenities,
  amenitieDetails,
}) => {
  const [basicCount, setBasicCount] = useState({
    guests: 1,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
  });

  const chnageAvailability = (type) => {
    const newData = amenitieDetails.map((amenitie) => {
      if (amenitie?.amenitie === type) {
        return {
          ...amenitie,
          available: !amenitie?.available,
        };
      } else {
        return amenitie;
      }
    });
    updateAmenities(newData);
  };

  const increaseCount = (type) => {
    setBasicCount((prevValues) => ({
      ...prevValues,
      [type]: basicCount[type] + 1,
    }));
    updateCount(basicCount);
  };

  const decreaseCount = (type) => {
    setBasicCount((prevValues) => ({
      ...prevValues,
      [type]: basicCount[type] - 1,
    }));
    updateCount(basicCount);
  };
  let guestData = {
    guests: basicCount?.guests,
    bedrooms: basicCount?.bedrooms,
    beds: basicCount?.beds,
    bathrooms: basicCount?.bathrooms,
  };

  return (
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
          {amenitieDetails?.map((item) => (
            <div
              className="acc-amenitie"
              onClick={() => chnageAvailability(item?.amenitie)}
              style={{ border: item?.available ? "2px solid black" : null }}
            >
              <img src={item?.icon} className="acc-amenities-svg" />
              <div>{item?.amenitie}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesDetatils;
