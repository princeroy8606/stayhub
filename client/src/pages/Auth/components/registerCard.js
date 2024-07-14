import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { signUp } from "../../../redux/features/actions/authentication";
import Checkbox from "@mui/material/Checkbox";
import { blueGrey } from "@mui/material/colors";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import dayjs from "dayjs";
import {
  Autocomplete,
  Button,
  CircularProgress,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { AllCities, AllCountrys } from "../../../utils/country-state-api";
import {
  isStrongPassword,
  isValidAge,
  isValidEmail,
  isValidName,
  isValidPhoneNumber,
  isValidPincode,
} from "../../../utils/validityChecks";
import { DatePicker } from "@mui/x-date-pickers";
import assets from "../../../assets/assets";

const RegisterCard = ({ setAuthType }) => {
  const [userData, setUserData] = useState({
    name: null,
    email: null,
    phone: null,
    password: null,
    dob: null,
    age: null,
    gender: null,
    city: null,
    pincode: null,
    country: null,
    state: null,
    addressProof: null,
    terms: false,
  });
  const [allCountrys, setAllCountrys] = useState([{ name: "error" }]);
  const [allStates, setAllStates] = useState([{ name: "error" }]);
  const [allCitys, setAllCitys] = useState(["error"]);
  const [passwordMatch, setPasswordMatch] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorArray, setErrorArray] = useState([]);
  const [processInitiated,setProcessInitiated] = useState(false)
  const dispatch = useDispatch();

  const checkPassword = (e) => {
    if (userData.password !== e.target.value) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  };

  useEffect(() => {
    const countryData = async () => {
      const data = await AllCountrys();
      setAllCountrys(data);
    };
    countryData();
  }, []);

  useEffect(() => {
    if (userData.country) {
      const statesData = allCountrys?.filter(
        (country) => country.name === userData.country
      );
      setAllStates(statesData[0].states);
    }
  }, [userData.country, allCountrys]);

  useEffect(() => {
    const citysData = async () => {
      if (userData?.state) {
        const cities = await AllCities(userData.state, userData.country);
        setAllCitys(cities);
      }
    };
    citysData();
  }, [userData.state, allStates]);

  const checkError = (field, condition, data) => {
    const updateErrorArray = [];
    if (field) {
      console.log("feild");
      console.log(condition, field);
      if (condition && errorArray.includes(field))
        return setErrorArray((prevArray) =>
          prevArray.filter((item) => item !== field)
        );
      if (!condition && !errorArray.includes(field)) {
        console.log(condition, field);
        return setErrorArray([...errorArray, field]);
      }
    } else {
      if (!isValidName(userData.name)) updateErrorArray.push("name");
      if (!isValidEmail(userData.email)) updateErrorArray.push("email");
      if (!isValidPhoneNumber(userData.phone)) updateErrorArray.push("phone");
      if (!isValidAge(userData.dob)) updateErrorArray.push("dob");
      if (!isStrongPassword(userData.password) || !userData.password)
        updateErrorArray.push("password");
      if (!isValidPincode(userData.pincode)) updateErrorArray.push("pincode");
      if (!userData.gender) updateErrorArray.push("gender");
      if (!userData.terms) updateErrorArray.push("terms");
      if (!userData.country) updateErrorArray.push("country");
      if (!userData.state) updateErrorArray.push("state");
      if (!userData.city) updateErrorArray.push("city");
      if (!userData.addressProof) updateErrorArray.push("addressProof");
      setErrorArray(updateErrorArray);
    }
  };

  const handleSingUp = () => {
    const formData = new FormData();
    checkError();
    console.log("Before Appending ", errorArray);
    console.log("Before Appending ", userData.terms);
    formData.append("same", "Hello");
    const hasNullvalue = Object.values(userData).some(
      (value) => value === null
    );
    if (errorArray.length === 0 && !hasNullvalue) {
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      formData.append("phone", userData.phone);
      formData.append("dob", userData.age);
      formData.append("gender", userData.gender);
      formData.append("city", userData.city);
      formData.append("country", userData.country);
      formData.append("state", userData.state);
      formData.append("pincode", userData.pincode);
      formData.append("addressProof", userData.addressProof);
      formData.append("password", userData.password);
      formData.append("terms", userData.terms);
      dispatch(signUp(formData));
      setProcessInitiated(true)
    }
  };

  const handleValueChange = (feild, e, condition) => {
    const updatedData = { ...userData, [feild]: e?.target?.value };
    let isValid = condition(updatedData[feild]);
    // let isValid = true
    console.log(updatedData[feild]);
    setUserData(updatedData);
    checkError(feild, isValid, updatedData);
  };

  const handleDob = (dob) => {
    console.log(isValidAge(dob));
    checkError("dob", isValidAge(dob));
    const givenDate = new Date(dob?.$d);
    const currentDate = new Date();
    const differenceMs = currentDate - givenDate;
    const years = Math.floor(differenceMs / (1000 * 60 * 60 * 24 * 365));
    setUserData({ ...userData, dob: dob, age: years });
  };

  const maximumDate = () => {
    const today = new Date();
    return dayjs(today.setFullYear(today.getFullYear() - 17));
  };

  const renderInputField = (
    label,
    // onChangeFun,
    type = "text",
    error = false,
    message = "",
    condition
  ) => (
    <div className="register-input-small">
      <p>{label}*</p>
      <input
        type={type}
        className="register-input"
        style={{ borderColor: error ? "red" : null }}
        onChange={(e) => handleValueChange(label.toLowerCase(), e, condition)}
      />
      {error && (
        <p
          style={{
            fontSize: ".9rem",
            fontWeight: 200,
            color: "red",
            fontFamily: "sans-serif",
            marginTop: "5px",
          }}
        >
          {label} is required , {message}
        </p>
      )}
    </div>
  );

  return (
    <div className="register-card">
      <div className="register-title">Create new account</div>
      <div className="register-inputs">
        <div className="register-input-nested">
          {renderInputField(
            "Name",
            "text",
            errorArray.includes("name"),
            "Enter Valid Name",
            // isValidName(userData.name)
            (value) => isValidName(value)
          )}
          {renderInputField(
            "Email",
            "text",
            errorArray.includes("email"),
            "Enter valid email",
            (value) => isValidEmail(value)
          )}
          {renderInputField(
            "Phone",
            "number",
            errorArray.includes("phone"),
            "Enter valid Phone No",
            (value) => isValidPhoneNumber(value)
          )}
        </div>
        <div className="register-input-nested">
          <div style={{ width: "30%" }}>
            <DatePicker
              value={userData.dob}
              openTo="year"
              // format="DD/MM/YYYY"
              label={"Date of birth"}
              formatDensity="spacious"
              maxDate={maximumDate()}
              sx={{
                width: "100%",
                marginTop: "5%",
                "& .MuiOutlinedInput-root": {
                  fieldset: {
                    borderColor: errorArray.includes("dob") ? "red" : "gray",
                  },
                  "&:hover > fieldset": {
                    borderColor: errorArray.includes("dob") ? "red" : "gray",
                  },
                  height: "100%",
                  borderRadius: "6px",
                  width: "100%",
                },
                "& .css-18i39jb-MuiFormLabel-root-MuiInputLabel-root": {
                  color: errorArray.includes("age") ? "red" : "black",
                },
                "&  .css-s653fb-MuiFormLabel-root-MuiInputLabel-root ": {
                  color: "black",
                },
                "& .css-nxo287-MuiInputBase-input-MuiOutlinedInput-input": {
                  color: "black",
                },
              }}
              onChange={(newValue) => handleDob(newValue)}
              slotProps={{
                openPickerIcon: { fontSize: "small" },
                openPickerButton: { color: "black" },
                textField: {
                  color: "primary",
                  inputProps: {},
                },
              }}
            />
            {errorArray?.includes("dob") && (
              <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
                Invalid Date
              </p>
            )}
          </div>
          <div className="register-input-small" style={{ width: "65%" }}>
            <p>Gender*</p>
            <div className="gender-select-cover">
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    style={{ color: "gray" }}
                    color="primary"
                    checked={userData.gender === "male"}
                    sx={{
                      borderColor: "white",
                    }}
                    onChange={(e) =>
                      handleValueChange("gender", e, (value) => {
                        return value !== null;
                      })
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
                    style={{ color: "gray" }}
                    checked={userData.gender === "female"}
                    onChange={(e) =>
                      handleValueChange("gender", e, (value) => {
                        return value !== null;
                      })
                    }
                    value="female"
                  />
                }
                label="Female"
              />
              <FormControlLabel
                value="end"
                control={
                  <Radio
                    style={{ color: "gray" }}
                    checked={userData.gender === "other"}
                    onChange={(e) =>
                      handleValueChange("gender", e, (value) => {
                        return value !== null;
                      })
                    }
                    value="other"
                  />
                }
                label="Other"
              />
            </div>
            {errorArray?.includes("gender") && (
              <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
                Gender is required
              </p>
            )}
          </div>
        </div>
        {/* <div className="register-input-big">
          <p>Gender*</p>
          <div className="gender-select-cover">
            <FormControlLabel
              value="end"
              control={
                <Radio
                  style={{ color: "gray" }}
                  color="primary"
                  checked={userData.gender === "male"}
                  sx={{
                    borderColor: "white",
                  }}
                  onChange={(e) =>
                    handleValueChange("gender", e, (value)=> {return value !== null})
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
                  style={{ color: "gray" }}
                  checked={userData.gender === "female"}
                  onChange={(e) =>
                    handleValueChange("gender", e, (value)=> {return value !== null})
                  }
                  value="female"
                />
              }
              label="Female"
            />
            <FormControlLabel
              value="end"
              control={
                <Radio
                  style={{ color: "gray" }}
                  checked={userData.gender === "other"}
                  onChange={(e) =>
                    handleValueChange("gender", e, (value)=> {return value !== null})
                  }
                  value="other"
                />
              }
              label="Other"
            />
          </div>
          {errorArray?.includes("gender") && (
            <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
              Gender is required
            </p>
          )}
        </div> */}
        <div className="register-input-nested">
          <div className="register-input-small">
            <Autocomplete
              disablePortal
              options={allCountrys}
              getOptionLabel={(options) => options.name}
              onChange={(e, obj) => {
                handleValueChange(
                  "country",
                  { target: { value: obj.name } },
                  (value) => {
                    return value !== null;
                  }
                );
                // setUserData({ ...userData, country: obj?.name });
                // checkError("country");
              }}
              sx={{
                color: "black",
                bgcolor: "#F2F4F7",
                borderRadius: ".5rem",
                "&:hover": {
                  borderColor: "white",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Country"
                  sx={{ borderColor: "white" }}
                  error={errorArray.includes("country")}
                />
              )}
            />
            {errorArray?.includes("country") && (
              <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
                Select Your Country
              </p>
            )}
          </div>
          <div className="register-input-small">
            <Autocomplete
              disablePortal
              options={allStates}
              getOptionLabel={(options) => options.name}
              onChange={(e, obj) => {
                handleValueChange(
                  "state",
                  { target: { value: obj.name } },
                  (value) => {
                    return value !== null;
                  }
                );
                // setUserData({ ...userData, state: obj?.name });
                // checkError("state");
              }}
              sx={{
                bgcolor: "#F2F4F7",
                borderRadius: ".5rem",
                "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#8C593D",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  error={errorArray.includes("state")}
                />
              )}
            />
            {errorArray?.includes("state") && (
              <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
                Select Your State
              </p>
            )}
          </div>
          <div className="register-input-small">
            <Autocomplete
              disablePortal
              options={allCitys}
              getOptionLabel={(options) => options}
              onChange={(e, obj) => {
                // setUserData({ ...userData, city: obj });
                handleValueChange(
                  "city",
                  { target: { value: obj } },
                  (value) => {
                    return value !== null;
                  }
                );
                // checkError("city");
              }}
              sx={{
                color: "white",
                bgcolor: "#F2F4F7",
                borderRadius: ".5rem",
                "&:hover": {
                  borderColor: "white",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  sx={{ borderColor: "white" }}
                  error={errorArray.includes("city")}
                />
              )}
            />
            {errorArray?.includes("city") && (
              <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
                Select Your City
              </p>
            )}
          </div>
        </div>
        {/* <div className="register-input-big">
          <div className="register-input-small">
            <Autocomplete
              disablePortal
              options={allCitys}
              getOptionLabel={(options) => options}
              onChange={(e, obj) => {
                // setUserData({ ...userData, city: obj });
                handleValueChange(
                  "city",
                  { target: { value: obj } },
                  (value)=>{return value!== null}
                );
                // checkError("city");
              }}
              sx={{
                color: "white",
                bgcolor: "#F2F4F7",
                borderRadius: ".5rem",
                "&:hover": {
                  borderColor: "white",
                },
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="City"
                  sx={{ borderColor: "white" }}
                  error={errorArray.includes("city")}
                />
              )}
            />
            {errorArray?.includes("city") && (
              <p style={{ fontSize: ".9rem", fontWeight: 300, color: "red" }}>
                Select Your City
              </p>
            )}
          </div>
        </div> */}

        <div className="register-input-nested">
          {renderInputField(
            "Pincode",
            "number",
            errorArray.includes("pincode"),
            "Enter valid pincode",
            (value) => isValidPincode(value)
          )}
          <div className="register-input-small">
            <p>ID proof* - In pdf format</p>
            {userData?.addressProof ? (
              <h5>{userData?.addressProof?.name}</h5>
            ) : (
              <Button
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
                sx={{
                  bgcolor: errorArray?.includes("addressProof")
                    ? "red"
                    : "wheat",
                }}
              >
                Upload file
                <input
                  type="file"
                  className="hiden-input"
                  accept="application/pdf"
                  onChange={
                    (e) =>
                      handleValueChange(
                        "addressProof",
                        { target: { value: e.target.files[0] } },
                        (value) => {
                          return value !== null;
                        }
                      )
                    // setUserData({
                    //   ...userData,
                    //   addressProof: e.target.files[0],
                    // })
                  }
                />
              </Button>
            )}
            {errorArray?.includes("proof") && (
              <p
                style={{
                  fontSize: "1rem",
                  fontWeight: 300,
                  color: "#ff474c",
                  fontFamily: "sans-serif",
                  marginTop: "5px",
                }}
              >
                Any Id proof should be Upload
              </p>
            )}
          </div>
        </div>
        <div className="register-input-nested">
          {renderInputField(
            "Password",
            showPassword ? "text" : "password",
            errorArray.includes("password"),
            "Try a strong password with at least 8 charactres ",
            (value) => isStrongPassword(value)
          )}
          <div className="register-input-small">
            {passwordMatch === false ? (
              <p style={{ fontSize: "0.8rem", color: "red" }}>
                Password Missmatch
              </p>
            ) : (
              <p>Confirm Password</p>
            )}

            <input
              type={showPassword ? "text" : "password"}
              className="register-input"
              onChange={(e) => checkPassword(e)}
            />
            <div
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              style={{ left: "35%" }}
            >
              <img
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                src={
                  !showPassword
                    ? assets.Images.show_password
                    : assets.Images.hide_password
                }
              />
            </div>
          </div>
        </div>
        <div className="terms-ticker-cnt">
          <Checkbox
            value={userData?.terms}
            onChange={(e) =>
              setUserData({ ...userData, terms: e.target.checked })
            }
            sx={{
              color: blueGrey[800],
              "&.Mui-checked": {
                color: blueGrey[600],
              },
            }}
          />

          <p>
            I here by Accept all the <span>Terms And Conditions</span> of this
            website
          </p>
        </div>
        {!userData?.terms && (
          <p style={{ color: "red" }}>Terms should be accepted </p>
        )}
        <div className="register-btn" onClick={handleSingUp}>
          {processInitiated ? <CircularProgress /> :"Register" }  
        </div>
      </div>
      <div className="backto-login-btn" onClick={() => setAuthType()}>
        <h4
          style={{
            color: "white",
            fontWeight: "400",
            transform: "rotate(-90deg)",
            width: "10rem",
            position: "absolute",
            textAlign: "center",
            fontSize: "1.5rem",
          }}
        >
          Login ↘{" "}
        </h4>
      </div>
    </div>
  );
};

export default RegisterCard;
