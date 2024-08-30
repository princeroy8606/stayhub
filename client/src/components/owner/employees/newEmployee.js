import React, { useEffect, useState } from "react";
import assets from "../../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import {
  Employees,
  addNewEmployee,
} from "../../../redux/features/actions/ownerActions";
import { useAuth } from "../../../context/authContext";
import SelectionList from "../../guest/selectionList";
// import { signUp } from "../../../redux/features/actions/authentication";
import { usePopupWithTimeout } from "../../../hooks/customHook";
import { resetHouseResponse } from "../../../redux/features/slices/ownerSlice";
import {
  isStrongPassword,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
} from "../../../utils/validityChecks";

const NewEmployee = ({ handleCancel }) => {
  const { userData } = useAuth();
  const dispatch = useDispatch();
  // const [popUp, setPopUP] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [employeData, setEmployeData] = useState({
    Name: "",
    Email: "",
    Phone: null,
    Password: "",
    Role: null,
    AdminId: userData?._id,
    UserType: "employee",
  });

  const [verifiedData, setVerifiedData] = useState(false);
  const response = useSelector((state) => state?.ownerReducer?.houseResponse);

  useEffect(() => {
    if (
      !employeData.Name ||
      !employeData.Email ||
      !employeData?.Phone ||
      !employeData?.Password ||
      !employeData?.Role
    )
      return setVerifiedData(false);

    setVerifiedData(true);
  }, [employeData]);

  const handleInputChange = (element, e) => {
    let validity;
    if (element === "Name") validity = isValidName(e.target.value);
    if (element === "Email") validity = isValidEmail(e.target.value);
    if (element === "Phone") validity = isValidPhoneNumber(e.target.value);
    if (element === "Password") validity = isStrongPassword(e.target.value);
    if (validity === false && !errorArray.includes(element)) {
      let latestArray = errorArray;
      latestArray.push(element);
      setErrorArray(latestArray);
    } else if (validity === true && errorArray.includes(element)) {
      let latestArray = errorArray.filter((error) => error !== element);
      setErrorArray(latestArray);
    }

    setEmployeData((prevdata) => ({
      ...prevdata,
      [element]: e.target.value,
    }));
  };

  console.log(errorArray);

  const handleSubmit = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(employeData?.Email)) {
      dispatch(addNewEmployee(employeData));
    } else {
      console.log("email Invalid");
    }
  };

  usePopupWithTimeout(response === true, () => {
    dispatch(Employees(userData?._id));
    dispatch(resetHouseResponse());
  });
  response && handleCancel();

  return (
    <div className="popUp-room-edit" style={{ position: "absolute" }}>
      <div className="cancel-btn" onClick={() => handleCancel(false)}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      {/* {popUp && (
        <div className="Pop-Up-cnt">
          <h6>Saved successfully</h6>
        </div>
      )} */}
      <div className="block-center-form  block-center-form-edit">
        <h2 style={{ textAlign: "center" }}>New Employee</h2>
        <div className="form-cnt">
          <div className="form-input-cnt">
            {errorArray.includes("Name") ? (
              <h5 style={{ color: "red" }}>Enter A Valid Name</h5>
            ) : (
              <h4>Name</h4>
            )}
            <input
              type="text"
              className="form-input-box"
              value={employeData?.Name}
              onChange={(e) => handleInputChange("Name", e)}
            />
          </div>
          <div className="form-input-cnt rolen-input-cnt">
            <h4>Role :</h4>
            <SelectionList
              data={["Manager", "Staff", "Admin"]}
              onSelect={(e) =>
                setEmployeData((prevdata) => ({
                  ...prevdata,
                  Role: e.target.value,
                }))
              }
            />
          </div>
          <div className="form-input-cnt">
            {errorArray.includes("Email") ? (
              <h5 style={{ color: "red" }}>Enter A Valid Email</h5>
            ) : (
              <h4>Email</h4>
            )}
            <input
              type="text"
              name="FloorSize"
              className="form-input-box"
              value={employeData?.Email}
              onChange={(e) => handleInputChange("Email", e)}
            />
          </div>
          <div className="form-input-cnt">
            {errorArray.includes("Phone") ? (
              <h5 style={{ color: "red" }}>Enter A Valid Phone Number</h5>
            ) : (
              <h4>Phone</h4>
            )}
            <input
              type="number"
              className="form-input-box"
              defaultValue={employeData?.Phone}
              onChange={(e) => handleInputChange("Phone", e)}
            />
          </div>
          <div className="form-input-cnt">
            {errorArray.includes("Password") ? (
              <h5 style={{ color: "red" }}>Enter A Strong Password</h5>
            ) : (
              <h4>Password</h4>
            )}
            <input
              type="password"
              className="form-input-box"
              value={employeData?.Password}
              onChange={(e) => handleInputChange("Password", e)}
            />
          </div>
        </div>
        <div
          className="submit-btn"
          style={{
            backgroundColor: verifiedData ? "black" : "gray",
          }}
          onClick={verifiedData ? handleSubmit : null}
        >
          Add
        </div>
      </div>
    </div>
  );
};

export default NewEmployee;
