import React, { useEffect, useState } from "react";
import HomeCard from "./homeCard";
import AddHouse from "./newAcomodation/addHouse";
import { useDispatch, useSelector } from "react-redux";
import { getOwnerHouse } from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";
import { Skeleton } from "@mui/material";

const Propertys = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const [showAddArea, setShowAddArea] = useState(false);

  const houseList = useSelector((state) => state.ownerReducer?.houses);

  useEffect(() => {
    dispatch(getOwnerHouse(userData?._id));
  }, [userData,dispatch]);

  const skeletonElements = [];
  for (let i = 0; i < 4; i++) {
    if (!houseList) {
      skeletonElements.push(
        <Skeleton
          sx={{ bgcolor: "grey.400" }}
          variant="rounded"
          width={"30rem"}
          height={"15rem"}
          animation="wave"
          key={i}
        />
      );
    }
  }

  return (
    <div className="dashboard-cnt property">
      <div className="dashboard-top">
        <h2 className="dashboard-head-text">Properties</h2>
        <div className="add-Button" onClick={() => setShowAddArea(true)}>
          Add New House
        </div>
      </div>

      <div className="property-list-cnt">
        <div className="item-list">
          {houseList?.map((house, index) => (
            <HomeCard data={house} key={index} />
          ))}
          {!houseList && skeletonElements}
        </div>
      </div>
      {showAddArea && <AddHouse handleCancel={() => setShowAddArea(false)} />}
    </div>
  );
};

export default Propertys;
