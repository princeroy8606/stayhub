import React, { useState } from "react";
import assets from "../../../../assets/assets";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/authContext";
import { editHouse } from "../../../../redux/features/actions/ownerActions";

const EditPrice = ({ data, handleCancel, houseId }) => {
  const [rentAmount, setRentAmount] = useState(data);
  const dispatch = useDispatch();
  const { userData } = useAuth();

  const handleSave = () => {
    if (data !== rentAmount)
      dispatch(
        editHouse({
          data: { Price: rentAmount },
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
      <div className="acc-amenities-cnt">
        <h1>Now, set your price</h1>
        <p>You can change it anytime.</p>
        <div className="new-price-input-cnt">
          <div>₹</div>
          <input
            type="number"
            className="new-price-input"
            value={rentAmount}
            onChange={(e) => setRentAmount(e.target.value)}
          />
        </div>
      </div>
      <div className="popup-footer-cnt">
        <div
          className="popup-footer-btn"
          style={{ backgroundColor: "black" }}
          onClick={handleSave}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditPrice;
