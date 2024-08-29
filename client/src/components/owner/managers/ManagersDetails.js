import { Skeleton } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { AllManagers } from "../../../redux/features/actions/ownerActions";

const ManagersDetails = () => {
  const { userData } = useAuth();
  const ManagerList = useSelector((state) => state?.ownerReducer?.managersList);

  const dispatch = useDispatch();
  useEffect(() => {
    const handleDispatch = () => {
      if (!ManagerList) {
        return dispatch(AllManagers(userData?._id));
      }
      console.log(ManagerList);
    };
    handleDispatch();
  }, [ManagerList,userData?._id,dispatch]);

  const skeletonElements = [];
  for (let i = 0; i < 7; i++) {
    if (!ManagerList) {
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
  return (
    <div className="dashboard-cnt">
      <div className="dashboard-top">
        <h2 className="dashboard-head-text"> Managers Details</h2>
      </div>
      <div className="property-list-cnt">
        <div className="booked-card-cnt" style={{ backgroundColor: "#ecb975" }}>
          <h3 className="employe-row-value" style={{color:"black"}}>Name</h3>
          <h3 className="employe-row-value" style={{color:"black"}}>Email</h3>
          <h3 className="employe-row-value" style={{color:"black"}}>Phone</h3>
          <h3 className="employe-row-value small-value" style={{color:"black"}}>Hosted Acc</h3>
          <h3 className="employe-row-value small-value" style={{color:"black"}}>more</h3>
        </div>
        {ManagerList
          ? ManagerList.map((manager) => (
              <div className="booked-card-cnt" key={manager?.name}>
                <div className="employe-row-value">{manager?.name}</div>
                <div className="employe-row-value">{manager?.email}</div>
                <div className="employe-row-value">{manager?.phone}</div>
                <div className="employe-row-value small-value">
                  {manager?.accomodations?.length}
                </div>
                <div className="employe-row-value small-value">here</div>
              </div>
            ))
          : skeletonElements}
      </div>
    </div>
  );
};

export default ManagersDetails;
