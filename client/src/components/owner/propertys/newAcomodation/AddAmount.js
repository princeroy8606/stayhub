import React from "react";

const AddAmount = ({ rentAmount, setRentAmount }) => {
  console.log(rentAmount.length);
  return (
    <div className="acc-amenities-cnt">
      <h1>Now, set your price</h1>
      <p>You can change it anytime.</p>
      <div className="new-price-input-cnt">
        <div>₹</div>
      <input
        type="number"
        className="new-price-input"
        value={rentAmount}
        onChange={(e) =>setRentAmount(e.target.value)}
      />
      </div>
    </div>
  );
};

export default AddAmount;
