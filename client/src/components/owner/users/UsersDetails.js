import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  AllUsers,
  removeGuest,
} from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";
import assets from "../../../assets/assets";

const UsersDetails = () => {
  const { userData } = useAuth();
  const UserList = useSelector((state) => state?.ownerReducer?.usersList);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleDispatch = () => {
      if (!UserList) {
        return dispatch(AllUsers(userData?._id));
      }
      console.log(UserList);
    };
    handleDispatch();
  }, [UserList,userData?._id,dispatch]);

  const skeletonElements = [];
  for (let i = 0; i < 7; i++) {
    if (!UserList) {
      skeletonElements.push(
        <Skeleton
          sx={{ bgcolor: "grey.400" }}
          variant="rounded"
          width={"100%"}
          height={"3rem"}
          style={{ marginBottom: 20 }}
          animation="wave"
          key={i}
        />
      );
    }
  }

  const handleDeleteGuest = (guestId) => {
    dispatch(removeGuest({ guestId: guestId }));
    dispatch(AllUsers(userData?._id));
  };
  return (
    <div className="dashboard-cnt">
      <div className="dashboard-top">
        <h2 className="dashboard-head-text"> Users Details</h2>
      </div>
      <div className="property-list-cnt">
        <div className="booked-card-cnt" style={{ backgroundColor: "#7b8ed8" }}>
          <h3 className="employe-row-value" style={{ color: "black" }}>
            Name
          </h3>
          <h3 className="employe-row-value" style={{ color: "black" }}>
            Email
          </h3>
          <h3 className="employe-row-value" style={{ color: "black" }}>
            Phone
          </h3>
          <h3
            className="employe-row-value small-value"
            style={{ color: "black" }}
          >
            Age
          </h3>
          <h3
            className="employe-row-value small-value"
            style={{ color: "black" }}
          >
            Gender
          </h3>
          <h3
            className="employe-row-value small-value"
            style={{ color: "black" }}
          >
            Delete
          </h3>
        </div>
        {UserList
          ? UserList.map((user) => (
              <div className="booked-card-cnt" key={user?.name}>
                <div className="employe-row-value">{user?.name}</div>
                <div className="employe-row-value">{user?.email}</div>
                <div className="employe-row-value">{user?.phone}</div>
                <div className="employe-row-value small-value">{user?.age}</div>
                <div className="employe-row-value small-value">
                  {user?.gender}
                </div>
                <img
                alt=""
                  className="employe-row-value small-value"
                  src={assets.Images.delete_Icon}
                  onClick={() => handleDeleteGuest(user?._id)}
                  style={{
                    objectFit: "contain",
                    padding: "1rem",
                    cursor: "pointer",
                  }}
                />
                {/* <div className="employe-row-value small-value">{user?.gender}</div> */}
              </div>
            ))
          : skeletonElements}
      </div>
    </div>
  );
};

export default UsersDetails;
