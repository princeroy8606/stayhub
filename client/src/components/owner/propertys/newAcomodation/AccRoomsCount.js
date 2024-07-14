import React from "react";

const AccRoomsCount = ({ guestData, IncreaseCount, DecreaseCount }) => {
  const { guests, bedrooms, beds, bathrooms } = guestData;
  return (
    <div className="guest-filter-cnt acc-room-count ">
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Guests</h4>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (guests > 0 ? DecreaseCount("guests") : null)}
          > 
            -
          </div>
          <div>{guests}</div>
          <div
            className="count-btn"
            onClick={() => (guests < 16 ? IncreaseCount("guests") : null)}
          >
            +
          </div>
        </div>
      </div>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Bedrooms</h4>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (bedrooms > 0 ? DecreaseCount("bedrooms") : null)}
          >
            -
          </div>
          <div>{bedrooms}</div>
          <div
            className="count-btn"
            onClick={() => (bedrooms < 16 ? IncreaseCount("bedrooms") : null)}
          >
            +
          </div>
        </div>
      </div>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Beds</h4>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (beds > 0 ? DecreaseCount("beds") : null)}
          >
            -
          </div>
          <div>{beds}</div>
          <div
            className="count-btn"
            onClick={() => (beds < 6 ? IncreaseCount("beds") : null)}
          >
            +
          </div>
        </div>
      </div>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Bathrooms</h4>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (bathrooms > 0 ? DecreaseCount("bathrooms") : null)}
          >
            -
          </div>
          <div>{bathrooms}</div>
          <div
            className="count-btn"
            onClick={() => (bathrooms < 6 ? IncreaseCount("bathrooms") : null)}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccRoomsCount;
