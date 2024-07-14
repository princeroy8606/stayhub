import React, { useEffect, useState } from "react";
import { Button, FormControlLabel, Radio } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { newBooking } from "../../redux/features/actions/guestActions";
import {
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidPincode,
} from "../../utils/validityChecks";

const GuestDetails = () => {
  const data = useLocation()?.state?.data;
  const [isFormOpen, setIsFromOpen] = useState({ open: false, index: null });
  const paymentStarted = useSelector(
    (state) => state.guestReducer?.payemntResponse
  );
  const [isuserIncluded, setIsUserIncluded] = useState(true);
  const [isVerifed, setIsVerifed] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [GuestDetails, setGuestDetails] = useState([]);
  const [guestData, setGuestData] = useState(null);
  const [isLoading, setIsLoading] = useState(paymentStarted);
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const requiredDataTemplate = {
    name: "Prince",
    email: "princeroy8606@gmail.com",
    pincode: 673579,
    gender: "male",
    address: "address illa",
    phone: 8689092346,
    age: 12,
    proof: null,
    verified: false,
  };

  const handleOpenForm = (dataIndex) => {
    setGuestData(GuestDetails[dataIndex]);
    setIsFromOpen({ open: !isFormOpen?.open, index: dataIndex });
  };

  const handleUserDataUpdate = (data, type, validity) => {
    setGuestData({ ...guestData, [type]: data });
    if (validity && errorArray.includes(type)) {
      let newArray = errorArray?.filter((attr) => attr !== type);
      setErrorArray(newArray);
    } else if (!validity && !errorArray.includes(type)) {
      let newArray = [...errorArray, type];
      setErrorArray(newArray);
    }
  };

  console.log(errorArray, isVerifed);

  const handleSave = () => {
    const updateArray = [...errorArray];
    for (let key in guestData) {
      if ((guestData[key] === null) & !updateArray.includes(key)) {
        updateArray.push(key);
      }
    }
    setErrorArray(updateArray);
    if (updateArray?.length < 1 && errorArray.length < 1) {
      const updatedGuestData = { ...guestData, verified: true };
      const spreadDetails = [...GuestDetails];
      spreadDetails[isFormOpen?.index] = updatedGuestData;
      setGuestDetails(spreadDetails);
      setIsFromOpen({ open: false, index: null });
      setGuestData(null);
    }
  };

  // useEffect(() => {
  //   const updateArray = errorArray;
  //   for (let key in guestData) {
  //     if ((guestData[key] === null) & !updateArray.includes(key)) {
  //       updateArray.push(key);
  //     }
  //   }
  //   console.log(updateArray)
  //   setErrorArray(updateArray);
  //   console.log("hello")
  // }, [errorArray]);

  useEffect(() => {
    checkUserData();
  }, [GuestDetails]);

  useEffect(() => {
    setIsLoading(false);
  }, [paymentStarted]);

  useEffect(() => {
    if (!isuserIncluded) {
      setGuestDetails((prev) => [...prev, requiredDataTemplate]);
    } else if (
      GuestDetails.length > data?.GuestCount - 1 ||
      GuestDetails.length === 1
    ) {
      const updatedGuestDetails = [...GuestDetails];
      updatedGuestDetails.pop();
      setGuestDetails(updatedGuestDetails);
    }
  }, [isuserIncluded]);

  useEffect(() => {
    let arrayofGuest = [];
    if (data?.GuestCount > 1) {
      for (let i = 0; i < data?.GuestCount - 1; i++) {
        arrayofGuest.push(requiredDataTemplate);
      }
      setGuestDetails(arrayofGuest);
    }
  }, []);

  const checkUserData = () => {
    const anyGuestWithoutDetails = GuestDetails.some(
      (guest) => !guest.verified
    );
    setIsVerifed(!anyGuestWithoutDetails);
  };

  const hanldecontinue = () => {
    const bookingData = {
      bookingDetails: data,
      gusetDetails: GuestDetails,
      self: isuserIncluded,
    };
    Navigate("payment", { state: { data: { bookingData } } });
    // dispatch(newBooking(formData));
    setIsLoading(true);
  };

  const cancelPopup = () => {
    setErrorArray([]);
    setIsFromOpen({ open: false, index: null });
  };


  return (
    <div className="landing-cont guest-details-cnt">
      <div className="guest-detials-right-cnt">
        <p style={{ fontWeight: "600" }}>Guest Details ↘</p>
        <div className="toggle-btn-cnt">
          <div
            className="guest-details-toggle-btn"
            style={{
              backgroundColor: !isuserIncluded && "#f5f5f5",
              color: !isuserIncluded && "GrayText",
            }}
            onClick={() => setIsUserIncluded(true)}
          >
            <h5>Booking for Myself</h5>
          </div>
          <div
            className="guest-details-toggle-btn"
            style={{
              backgroundColor: isuserIncluded && "#f5f5f5",
              color: isuserIncluded && "GrayText",
            }}
            onClick={() => setIsUserIncluded(false)}
          >
            <h5>Booking for Someone Else</h5>
          </div>
        </div>
        <div
          className="guest-details-toggle-btn"
          style={{
            pointerEvents: isVerifed ? "all" : "none",
            backgroundColor: isVerifed ? "black" : "gray",
            opacity: isVerifed ? 1 : 0.8,
            height: "50%",
          }}
          onClick={() => hanldecontinue()}
        >
          <p>Continue →</p>
        </div>
        {/* <div
          className="continue-btn"
          style={{
            pointerEvents: isVerifed ? "all" : "none",
            backgroundColor: isVerifed ? "black" : "gray",
            opacity: isVerifed ? 1 : 0.8,
          }}
          onClick={hanldecontinue}
        >
          {isLoading ? (
            <img
              style={{ width: "50%", height: "90%", objectFit: "contain" }}
              src="https://cdn.pixabay.com/animation/2022/07/29/03/42/03-42-22-68_512.gif"
            />
          ) : (
            <h5 style={{ color: "white", fontSize: "1.8rem" }}>
              Continue Booking
            </h5>
          )}
        </div> */}
      </div>
      {
        GuestDetails.length <1 && <h1 style={{fontSize:"1.5rem", fontWeight:"500",color:"GrayText",marginTop:"2rem"}}>Your Details Will be Automatically updated</h1>
      }
      <div className="guest-cards-area">
        {GuestDetails?.map((guest, index) => (
          <div
            key={index}
            className={`guest-card-cnt  ${
              isFormOpen?.open && isFormOpen?.index === index
                ? "guest-card-incomplete"
                : null
            }`}
            style={{ borderColor: guest.verified ? "green" : "gray" }}
            onClick={() => handleOpenForm(index)}
          >
            {isFormOpen.open && isFormOpen.index === index ? (
              <p style={{ fontSize: "2rem", fontWeight: "800" }}>
                {console.log(guest.gender)}
                Guest {index + 1}{" "}
              </p>
            ) : (
              <div className="guest-data-display">
                <p>
                  <span>Name </span>
                  {guest.name}
                </p>
                <p>
                  <span>Email</span> {guest.email}
                </p>
                <p>
                  <span>Phone</span> {guest.phone}
                </p>
                <p>
                  <span>Age</span> {guest.age}
                </p>
                <p>
                  <span>Gender</span> {guest.gender}
                </p>

                <p>
                  {" "}
                  <span>Address</span> {guest.address}
                </p>
                <p>
                  <span>Pincode</span> {guest.pincode}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        className="guest-details-input-cover"
        style={{
          transform: isFormOpen.open && "scale(1)",
          opacity: isFormOpen.open && 1,
        }}
      >
        <div
          className="guest-details-input-cnt"
          style={{
            transform: isFormOpen.open ? "scale(1)" : null,
            opacity: isFormOpen.open ? 1 : null,
          }}
        >
          <div className="register-input-nested">
            <div className="register-input-small">
              <p>Name*</p>
              <input
                type="text"
                className="register-input"
                value={guestData?.name ?? ""}
                style={{
                  borderColor: errorArray.includes("name") ? "red" : null,
                }}
                onChange={(e) =>
                  handleUserDataUpdate(
                    e.target.value,
                    "name",
                    isValidName(e.target.value)
                  )
                }
              />
              {errorArray.includes("name") && (
                <p style={{ color: "red" }}>Enter valid Name</p>
              )}
            </div>
            <div className="register-input-small">
              <p>Email</p>
              <input
                type="text"
                className="register-input"
                value={guestData?.email ?? ""}
                style={{
                  borderColor: errorArray.includes("email") ? "red" : null,
                }}
                onChange={(e) =>
                  handleUserDataUpdate(
                    e.target.value,
                    "email",
                    isValidEmail(e.target.value)
                  )
                }
              />
              {errorArray.includes("email") && (
                <p style={{ color: "red" }}>Enter valid Email</p>
              )}
            </div>
          </div>
          <div className="register-input-nested">
            <div className="register-input-small">
              <p>Phone*</p>
              <input
                type="number"
                className="register-input"
                value={guestData?.phone ?? ""}
                style={{
                  borderColor: errorArray.includes("phone") ? "red" : null,
                }}
                onChange={(e) =>
                  handleUserDataUpdate(
                    e.target.value,
                    "phone",
                    isValidPhoneNumber(e.target.value)
                  )
                }
              />
              {errorArray.includes("phone") && (
                <p style={{ color: "red" }}>Enter valid Phone Number</p>
              )}
            </div>
            <div className="register-input-small">
              <p>Age*</p>
              <input
                type="number"
                value={guestData?.age ?? ""}
                className="register-input"
                style={{
                  borderColor: errorArray.includes("age") ? "red" : null,
                }}
                onChange={(e) =>
                  handleUserDataUpdate(
                    e.target.value,
                    "age",
                    e.target.value.length === 2
                  )
                }
              />
              {errorArray.includes("age") && (
                <p style={{ color: "red" }}>Enter valid Age</p>
              )}
            </div>
          </div>
          <div className="register-input-big">
            <p>Gender*</p>
            <div className="gender-select-cover">
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    style={{ color: "#ECB975" }}
                    color="primary"
                    checked={guestData?.gender === "male"}
                    sx={{ borderColor: "white" }}
                    onChange={(e) =>
                      handleUserDataUpdate(e.target.value, "gender", true)
                    }
                    value="male"
                  />
                }
                label="Male"
              />
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    style={{ color: "#ECB975" }}
                    checked={guestData?.gender === "female"}
                    onChange={(e) =>
                      handleUserDataUpdate(e.target.value, "gender", true)
                    }
                    value="female"
                  />
                }
                label="Female"
              />
            </div>
            {errorArray.includes("gender") && (
              <p style={{ color: "red" }}>Select Gender</p>
            )}
          </div>
          <div className="register-input-big">
            <p>Address*</p>
            <textarea
              type="text"
              className="register-input"
              aria-multiline
              value={guestData?.address ?? ""}
              onChange={(e) =>
                handleUserDataUpdate(
                  e.target.value,
                  "address",
                  e.target.value.length > 5
                )
              }
            />
            {errorArray.includes("address") && (
              <p style={{ color: "red" }}>Enter valid Address</p>
            )}
          </div>
          <div className="register-input-nested">
            <div className="register-input-small">
              <p>Pincode*</p>
              <input
                type="number"
                className="register-input"
                value={guestData?.pincode ?? ""}
                style={{
                  borderColor: errorArray.includes("pincode") ? "red" : null,
                }}
                onChange={(e) =>
                  handleUserDataUpdate(
                    e.target.value,
                    "pincode",
                    isValidPincode(e.target.value)
                  )
                }
              />
              {errorArray.includes("pincode") && (
                <p style={{ color: "red" }}>Enter valid Pincode</p>
              )}
            </div>
            <div className="register-input-small">
              <p>ID proof* in pdf format</p>
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: !guestData?.proof ? "red" : "wheat",
                }}
              >
                {guestData?.proof ? (
                  <>{guestData?.proof.name}</>
                ) : (
                  <>
                    Upload file
                    <input
                      type="file"
                      className="hiden-input"
                      accept="application/pdf"
                      onChange={(e) =>
                        handleUserDataUpdate(e.target.files[0], "proof", true)
                      }
                    />
                  </>
                )}
              </Button>
              {!guestData?.proof && (
                <p style={{ color: "red" }}>upload Your ID Proof</p>
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div
              className="register-btn"
              onClick={() => cancelPopup()}
              style={{
                backgroundColor: "#ebf2ff",
                width: "45%",
                color: "GrayText",
              }}
            >
              cancel
            </div>
            <div
              className="register-btn"
              style={{
                backgroundColor: isVerifed ? "black" : "gray",
                width: "45%",
                color: "white",
              }}
              onClick={() => handleSave()}
            >
              Save
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuestDetails;
