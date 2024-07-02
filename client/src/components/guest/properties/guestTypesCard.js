import React from "react";

const GuestTypesCard = ({ guestData, IncreaseCount, DecreaseCount ,style}) => {
  const { Adults, Childrens, Infants, Pets } = guestData;
  return (
    <div className="guest-filter-cnt" style={style}>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Adults</h4>
          <p>Ages 13 or above</p>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (Adults > 0 ? DecreaseCount("adults") : null)}
          >
            -
          </div>
          <div>{Adults}</div>
          <div
            className="count-btn"
            onClick={() => (Adults < 16 ? IncreaseCount("adults") : null)}
          >
            +
          </div>
        </div>
      </div>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Children</h4>
          <p>Ages 2 to 12</p>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (Childrens > 0 ? DecreaseCount("childrens") : null)}
          >
            -
          </div>
          <div>{Childrens}</div>
          <div
            className="count-btn"
            onClick={() => (Childrens < 16 ? IncreaseCount("childrens") : null)}
          >
            +
          </div>
        </div>
      </div>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Infants</h4>
          <p>Under 2</p>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (Infants > 0 ? DecreaseCount("infants") : null)}
          >
            -
          </div>
          <div>{Infants}</div>
          <div
            className="count-btn"
            onClick={() => (Infants < 6 ? IncreaseCount("infants") : null)}
          >
            +
          </div>
        </div>
      </div>
      <div className="guest-type-cnt">
        <div className="guest-type-spec">
          <h4>Pets</h4>
          <p>Service pets </p>
        </div>
        <div className="guest-count-cnt">
          <div
            className="count-btn"
            onClick={() => (Pets > 0 ? DecreaseCount("pets") : null)}
          >
            -
          </div>
          <div>{Pets}</div>
          <div
            className="count-btn"
            onClick={() => (Pets < 6 ? IncreaseCount("pets") : null)}
          >
            +
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestTypesCard;
