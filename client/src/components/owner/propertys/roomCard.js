import React, { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteThisRoom,
  getOwnerHouse,
} from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";
import { useNavigate } from "react-router-dom";
import EditRoom from "./editRoom";

const RoomCard = ({ data }) => {
  const dispatch = useDispatch();
  // const Navigate = useNavigate();
  const [Edit, setEdit] = useState(false);

  const { userData } = useAuth();
  const response = useSelector((state) => state?.ownerReducer?.deletedRoom);

  const handleDelete = () => {
    dispatch(deleteThisRoom({ HouseId: data?.houseId, RoomNo: data?.roomNo }));
  };

  useEffect(() => {
    if (response) {
      dispatch(getOwnerHouse(userData?._id));
    }
  }, [response]);

  return (
    <div className="owner-room-card">
      {Edit && <EditRoom handleCancel={() => setEdit(false)} data={data} />}
      <img src={assets.Images.landing_img} className="room-bookings-img" />
      <div className="room-card-bottom">
        <h3> Room No : {data?.roomNo}</h3>
        <h4>House : {data?.houseName}</h4>
        <h5>Beds : {data?.beds}</h5>
        <h5>
          Status : <span style={{ color: "#80cb10" }}>{data?.status}</span>
        </h5>
        <div className="room-card-btn-cnt">
          <div className="room-card-btn black-bg" onClick={() => setEdit(true)}>
            Edit
          </div>
          <div className="room-card-btn red-bg" onClick={handleDelete}>
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
