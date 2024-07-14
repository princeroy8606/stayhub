import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditImages from "./EditImages";
import EditCapacityAmenitie from "./EditCapacityAmenitie";
import EditAddress from "./EditAddress";
import CircularProgress from "@mui/material/CircularProgress";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTheHouse,
  editHouse,
  getOwnerHouse,
} from "../../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../../context/authContext";
import { resetHouseResponse } from "../../../../redux/features/slices/ownerSlice";
import EditPrice from "./EditPrice";

const EditAccomodation = () => {
  const accomodationData = useLocation().state?.data;
  const [houseData, setHouseData] = useState(accomodationData);
  const [showEdit, setShowEdit] = useState(false);
  const [editImage, setEditImage] = useState(false);
  const [editCapacity, setEditCapacity] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [editPrice, setEditPrice] = useState(false);
  const [isdeleteTogggled, setIsDeleteToggled] = useState(false);
  const [nameData, setNameData] = useState({
    title: houseData?.name?.title,
    description: houseData?.name?.description,
  });

  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const { userData } = useAuth();
  const updatedData = useSelector(
    (state) => state?.ownerReducer?.houseResponse
  );

  const checkChnage = () => {
    if (
      houseData?.name?.title !== nameData?.title ||
      houseData?.name?.description !== nameData?.description
    ) {
      return true;
    } else {
      return false;
    }
  };

  const handleSave = () => {
    checkChnage() &&
      dispatch(
        editHouse({
          data: { Name: nameData },
          houseId: houseData?._id,
          AdminId: userData?._id,
        })
      );
  };

  const handleDelete = () => {
    setIsDeleteToggled(true);
    dispatch(
      deleteTheHouse({ houseId: houseData?._id, AdminId: userData?._id })
    );
  };

  useEffect(() => {
    if (updatedData?.ok) {
      setHouseData(updatedData?.data);
      dispatch(resetHouseResponse());
      dispatch(getOwnerHouse(userData?._id));
    }
    if (updatedData?.deleted) {
      Navigate("/propertys");
    }
  }, [updatedData]);

  return (
    <div className="edit-acco-page">
      {editImage && (
        <EditImages data={houseData} handleCancel={() => setEditImage(false)} />
      )}
      {editCapacity && (
        <EditCapacityAmenitie
          data={houseData}
          handleCancel={() => setEditCapacity(false)}
          houseId={houseData?._id}
        />
      )}
      {editAddress && (
        <EditAddress
          data={houseData?.address}
          handleCancel={() => setEditAddress(false)}
          houseId={houseData?._id}
        />
      )}
      {editPrice && (
        <EditPrice
          data={houseData?.rentPerDay}
          handleCancel={() => setEditPrice(false)}
          houseId={houseData?._id}
        />
      )}
      {/* <div className="back-btn">
        <h4>←</h4>
      </div> */}
      <div className="edit-acco-cnt">
        <div
          className="edit-acco-img-cnt"
          onMouseOver={() => setShowEdit(true)}
          onMouseLeave={() => setShowEdit(false)}
        >
          <img
            src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
            alt={houseData?.images[0]?.filename}
            className="edit-acco-img top-img"
          />
          <img
            src={`${process.env.REACT_APP_BASEURL}${houseData?.images[1]?.url}`}
            alt={houseData?.images[0]?.filename}
            className="edit-acco-img"
          />
          <img
            src={`${process.env.REACT_APP_BASEURL}${houseData?.images[2]?.url}`}
            alt={houseData?.images[0]?.filename}
            className="edit-acco-img"
          />
          {showEdit && (
            <div className="acc-edit-btn-cnt">
              <div className="acc-edit-btn" onClick={() => setEditImage(true)}>
                <img
                  src="https://cdn-icons-png.flaticon.com/128/10426/10426353.png"
                  className="acc-edit-amenitie-img"
                />
                <div>edit</div>
              </div>
            </div>
          )}
        </div>
        <div className="name-discri-cnt">
          <h3 className="dashboard-head-text" style={{ fontSize: "25px" }}>
            Title & Description
          </h3>
          <div className="title-edit-cnt">
            Title:
            <input
              className="title-edit-input"
              value={nameData?.title}
              onChange={(e) =>
                setNameData((prevdata) => ({
                  ...prevdata,
                  title: e.target.value,
                }))
              }
            />
          </div>
          <div className="description-edit-cnt">
            <div> description :</div>
            <textarea
              className="title-edit-input"
              value={nameData?.description}
              onChange={(e) =>
                setNameData((prevdata) => ({
                  ...prevdata,
                  description: e.target.value,
                }))
              }
            />
          </div>
          {checkChnage() && (
            <div className="submit-btn" onClick={handleSave}>
              save changes
            </div>
          )}
        </div>
      </div>
      <div className="edit-acco-cnt">
        <div className="edit-acc-capacity-cnt">
          <div className="edit-acc-capacity-top">
            <h3 className="dashboard-head-text" style={{ fontSize: "25px" }}>
              capacity
            </h3>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10426/10426353.png"
              className="acc-edit-capacity-img"
              onClick={() => setEditCapacity(true)}
            />
          </div>

          <div className="acc-capacity-cnt">
            <div style={{ fontWeight: "500", color: "white" }}>
              {" "}
              guests : {houseData?.capacity?.guests}
            </div>
            <div style={{ fontWeight: "500", color: "white" }}>
              {" "}
              bedrooms : {houseData?.capacity?.bedrooms}
            </div>
            <div style={{ fontWeight: "500", color: "white" }}>
              {" "}
              beds : {houseData?.capacity?.beds}
            </div>
            <div style={{ fontWeight: "500", color: "white" }}>
              {" "}
              bathrooms : {houseData?.capacity?.bathrooms}
            </div>
          </div>
          <h3 className="dashboard-head-text" style={{ fontSize: "25px" }}>
            Amenities
          </h3>
          <div className="acc-edit-amenities-cnt">
            <>
              {houseData?.aminities?.map((amenitie, index) =>
                amenitie?.available ? (
                  <div className="acc-edit-amenitie" key={index}>
                    <img
                      src={amenitie?.icon}
                      className="acc-edit-amenitie-img"
                    />
                    {amenitie?.amenitie}
                  </div>
                ) : null
              )}
            </>
          </div>
        </div>
        <div className="edit-acc-capacity-cnt">
          <div className="edit-acc-capacity-top">
            <h3 className="dashboard-head-text" style={{ fontSize: "25px" }}>
              Address / Location{" "}
            </h3>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10426/10426353.png"
              className="acc-edit-capacity-img"
              onClick={() => setEditAddress(true)}
            />
          </div>

          <div className="address-info">
            <span style={{ fontWeight: "600", color: "GrayText" }}>
              Country{" "}
            </span>{" "}
            : {houseData?.address?.country}
          </div>
          <div className="address-info">
            <span style={{ fontWeight: "600", color: "GrayText" }}>State </span>{" "}
            : {houseData?.address?.state}
          </div>
          <div className="address-info">
            <span style={{ fontWeight: "600", color: "GrayText" }}>Area </span>{" "}
            : {houseData?.address?.area}
          </div>
          <div className="address-info">
            <span style={{ fontWeight: "600", color: "GrayText" }}>City </span>{" "}
            : {houseData?.address?.city}
          </div>
          <div className="address-info">
            <span style={{ fontWeight: "600", color: "GrayText" }}>Pin </span> :{" "}
            {houseData?.address?.pincode}
          </div>
          <div className="address-info">
            <span style={{ fontWeight: "600", color: "GrayText" }}>
              Address{" "}
            </span>{" "}
            : {houseData?.address?.streetAddress}
          </div>
        </div>
      </div>
      <div className="edit-amount-cnt">
        <div className="edit-amount">
          <div className="edit-acc-capacity-top">
            <h3 className="dashboard-head-text" style={{ fontSize: "20px" }}>
              Price per Night
            </h3>
            <img
              src="https://cdn-icons-png.flaticon.com/128/10426/10426353.png"
              className="acc-edit-capacity-img"
              onClick={() => setEditPrice(true)}
            />
          </div>
          <div className="amount-edit-input">
            <h1>₹ {houseData?.rentPerDay}</h1>
          </div>
        </div>
        <div className="remove-acc-cnt edit-amount" onClick={handleDelete}>
          <h5 style={{ fontSize: "20px" }}>
            Delete {nameData?.title} permenently all the datas will lost
          </h5>
          {isdeleteTogggled && <CircularProgress color="error" />}
        </div>
      </div>
    </div>
  );
};

export default EditAccomodation;
