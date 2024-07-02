import React, { useState } from "react";
import AmountScaleSlider from "./amountScaleSlider";

const GuestFilterCard = ({ sendData, appliedFilters, opacity }) => {
  const numbersArray = [0, 1, 2, 3, 4, 5, 6];
  const [roomAndBedsCount, setRoomAndBedsCount] = useState({
    bedrooms: appliedFilters?.roomAndBedsCount?.bedrooms || 0,
    bathrooms: appliedFilters?.roomAndBedsCount?.bathrooms || 0,
    beds: appliedFilters?.roomAndBedsCount?.beds || 0,
  });

  const [aminities, setAminities] = useState([]);

  let priceRange = {
    min: appliedFilters?.priceRange?.min || 0,
    max: appliedFilters?.priceRange?.max || 0,
  };
  const handleChnage = ({ min, max }) => {
    priceRange.min = min;
    priceRange.max = max;
  };

  const manageColor = (number, element) => {
    return {
      backgroundColor:
        roomAndBedsCount[element] === number ? "black" : "transparent",
      color: roomAndBedsCount[element] === number ? "white" : "black",
    };
  };

  const handleUpdateAminities = (type) => {
    let existingArray = aminities;
    if (aminities.includes(type)) {
      const filteredArray = existingArray.filter(
        (aminitie) => aminitie !== type
      );
      setAminities(filteredArray);
    } else {
      existingArray.push(type);
      setAminities(existingArray);
    }
  };
  console.log(aminities);

  const IncreaseCount = (type) => {
    setRoomAndBedsCount({
      ...roomAndBedsCount,
      [type]: roomAndBedsCount[type] + 1,
    });
  };

  const DecreaseCount = (type) => {
    setRoomAndBedsCount({
      ...roomAndBedsCount,
      [type]: roomAndBedsCount[type] - 1,
    });
  };

  return (
    <div
      className="filter-cnt"
      style={{
        opacity: opacity,
        visibility: opacity === 1 ? "visible" : "hidden",
        transform: `scale(${opacity === 1 ? 1 : 0})`,
      }}
    >
      <div className="price-range-cnt">
        <div className="selection-type-txt">Price Range</div>
        <AmountScaleSlider min={0} max={20000} onChange={handleChnage} />
      </div>
      <div className="rooms-beds-cnt">
        <div className="selection-type-txt">Rooms and Beds</div>
        <div className="selection-cnt">
          <div style={{ width: "20%", fontWeight: "600" }}>Bedrooms</div>
          {/* <div className="filter-selection-list">
            {numbersArray.map((number) => (
              <div
                className="selection-element"
                key={number}
                style={manageColor(number, "bedrooms")}
                onClick={() =>
                  setRoomAndBedsCount((prevCount) => ({
                    ...prevCount,
                    bedrooms: number,
                  }))
                }
              >
                {number === 0 ? "Any" : number}
              </div>
            ))}
          </div> */}
          <div className="guest-count-cnt">
            <div
              className="count-btn"
              onClick={() =>
                roomAndBedsCount.bedrooms > 0 ? DecreaseCount("bedrooms") : null
              }
            >
              -
            </div>
            <div style={{ fontWeight: "600" }}>
              {roomAndBedsCount.bedrooms === 0
                ? "Any"
                : roomAndBedsCount.bedrooms}
            </div>
            <div
              className="count-btn"
              onClick={() =>
                roomAndBedsCount.bedrooms < 6 ? IncreaseCount("bedrooms") : null
              }
            >
              +
            </div>
          </div>
        </div>
        <div className="selection-cnt">
          <div style={{ width: "20%", fontWeight: "600" }}>Bathrooms</div>
          {/* <div className="filter-selection-list">
            {numbersArray.map((number) => (
              <div
                className="selection-element"
                key={number}
                style={manageColor(number, "bathrooms")}
                onClick={() =>
                  setRoomAndBedsCount((prevCount) => ({
                    ...prevCount,
                    bathrooms: number,
                  }))
                }
              >
                {number === 0 ? "Any" : number}
              </div>
            ))}
          </div> */}
          <div className="guest-count-cnt">
            <div
              className="count-btn"
              onClick={() =>
                roomAndBedsCount.bathrooms > 0
                  ? DecreaseCount("bathrooms")
                  : null
              }
            >
              -
            </div>
            <div style={{ fontWeight: "600" }}>
              {roomAndBedsCount.bathrooms === 0
                ? "Any"
                : roomAndBedsCount.bathrooms}
            </div>
            <div
              className="count-btn"
              onClick={() =>
                roomAndBedsCount.bathrooms < 6
                  ? IncreaseCount("bathrooms")
                  : null
              }
            >
              +
            </div>
          </div>
        </div>
        <div className="selection-cnt">
          <div style={{ width: "20%", fontWeight: "600" }}>Beds</div>
          {/* <div className="filter-selection-list">
            {numbersArray.map((number) => (
              <div
                className="selection-element"
                key={number}
                style={manageColor(number, "beds")}
                onClick={() =>
                  setRoomAndBedsCount((prevCount) => ({
                    ...prevCount,
                    beds: number,
                  }))
                }
              >
                {number === 0 ? "Any" : number}
              </div>
            ))}
          </div> */}
          <div className="guest-count-cnt">
            <div
              className="count-btn"
              onClick={() =>
                roomAndBedsCount.beds > 0 ? DecreaseCount("beds") : null
              }
            >
              -
            </div>
            <div style={{ fontWeight: "600" }}>
              {roomAndBedsCount.beds === 0 ? "Any" : roomAndBedsCount.beds}
            </div>
            <div
              className="count-btn"
              onClick={() =>
                roomAndBedsCount.beds < 6 ? IncreaseCount("beds") : null
              }
            >
              +
            </div>
          </div>
        </div>
      </div>
      <div className="amenities-cnt">
        <div className="selection-type-txt">Amenities</div>
        <div className="selection-amenities-cnt">
          <div className="selection-amenitie">
            <input
              type="checkBox"
              className="checkbox"
              value={aminities.includes("wifi")}
              onChange={() => handleUpdateAminities("wifi")}
            />
            <div>Wifi</div>
          </div>
          <div className="selection-amenitie">
            <input
              type="checkBox"
              className="checkbox"
              onChange={() => handleUpdateAminities("washing machine")}
            />
            <div>Washing machine</div>
          </div>

          <div className="selection-amenitie">
            <input
              type="checkBox"
              className="checkbox"
              onChange={() => handleUpdateAminities("air conditioning")}
            />
            <div>Air conditioning</div>
          </div>
          <div className="selection-amenitie">
            <input
              type="checkBox"
              className="checkbox"
              onChange={() => handleUpdateAminities("TV")}
            />
            <div>TeliVision</div>
          </div>
        </div>
      </div>
      <div className="selection-footer">
        <div
          className="filter-submit-btn"
          onClick={() => sendData({ roomAndBedsCount, priceRange, aminities })}
        >
          Applay Filter
        </div>
      </div>
    </div>
  );
};

export default GuestFilterCard;
