import React, { useEffect, useState } from "react";
import assets from "../../../../assets/assets";
import { useDispatch } from "react-redux";
import { useAuth } from "../../../../context/authContext";
import { editHouse } from "../../../../redux/features/actions/ownerActions";
import { AllCities, AllCountrys } from "../../../../utils/country-state-api";
import { Autocomplete, TextField } from "@mui/material";

const EditAddress = ({ data, handleCancel, houseId }) => {
  const dispatch = useDispatch();
  const { userData } = useAuth();

  const [address, setAddress] = useState(data);
  const [countryData, setCountryData] = useState([{ name: "error" }]);
  const [stateData, setStateData] = useState([{ name: "error" }]);
  const [cityData, setCityData] = useState(["error"]);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const getCountryData = async () => {
      const data = await AllCountrys();
      setCountryData(data);
    };
    getCountryData();
  }, []);

  const handleSelectCountry = (selected) => {
    setSelectedCountry(selected?.name);
    const states = countryData?.filter(
      (country) => country.name === selected?.name
    );
    setStateData(states[0]?.states);
    setData(selected?.name, "country");
  };

  
  const handleStateSelect = async (state) => {
    setData(state, "state");
    const cities = await AllCities(state, selectedCountry);
    setCityData(cities);
  };


  const setData = (value, type) => {
    setAddress((prevvalues) => ({ ...prevvalues, [type]: value }));
  };

  const checkChange = () => {
    if (
      data?.country !== address?.country ||
      data?.area !== address?.area ||
      data?.state !== address?.state ||
      data?.streetAddress !== address?.streetAddress ||
      data?.pincode !== address?.pincode ||
      data?.city !== address?.city
    )
      return true;

    return false;
  };


  const newData = { Address: address };

  const handleSubmit = () => {
    checkChange() &&
      dispatch(
        editHouse({ data: newData, AdminId: userData?._id, houseId: houseId })
      );
    };
    console.log(address.country,address?.state);

  return (
    <div className="popUp-block" style={{ position: "absolute", zIndex: 5 }}>
      <div className="cancel-btn" onClick={() => handleCancel()}>
        <img src={assets.Images.Cross} alt="Close" />
      </div>
      <div></div>
      <div className="block-center-form acc-address-cnt">
        <h3>Where is the Location?</h3>
        <div
        className="address-input"
        style={{ padding: 0, boxSizing: "content-box" }}
      >
        <Autocomplete
          disablePortal
          options={countryData}
          getOptionLabel={(options) => options.name}
          onChange={(e, obj) => handleSelectCountry(obj)}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root::before": {
              border: "none",
            },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before ":
              {
                border: "none",
              },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root::after": {
              border: "none",
            },
            paddingLeft: "10px",
          }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              {...params}
              margin="none"
              label="Country"
              sx={{ borderColor: "transparent", borderRadius: "1.5rem" }}
              // error={errorArray.includes("country")}
            />
          )}
        />
      </div>
      <div
        className="address-input"
        style={{ padding: 0, boxSizing: "content-box" }}
      >
        <Autocomplete
          disablePortal
          options={stateData}
          getOptionLabel={(options) => options.name}
          onChange={(e, obj) => handleStateSelect(obj?.name, "state")}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root::before": {
              border: "none",
            },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before ":
              {
                border: "none",
              },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root::after": {
              border: "none",
            },
            paddingLeft: "10px",
          }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              {...params}
              margin="none"
              label="State"
              sx={{ borderColor: "transparent", borderRadius: "1.5rem" }}
            />
          )}
        />
      </div>
      <div
        className="address-input"
        style={{
          padding: 0,
          boxSizing: "content-box",
          backgroundColor: "white",
        }}
      >
        <Autocomplete
          disablePortal
          value={address?.city}
          options={cityData}
          getOptionLabel={(options) => options}
          onChange={(e, obj) => setData(obj, "city")}
          sx={{
            "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
              {
                borderColor: "red",
              },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root::before": {
              border: "none",
            },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root:hover:not(.Mui-disabled, .Mui-error):before ":
              {
                border: "none",
              },
            ".css-16d15bc-MuiInputBase-root-MuiInput-root::after": {
              border: "none",
            },
            paddingLeft: "10px",
          }}
          renderInput={(params) => (
            <TextField
              variant="standard"
              {...params}
              margin="none"
              label="City"
              sx={{ borderColor: "transparent", borderRadius: "1.5rem" }}
            />
          )}
        />
      </div>
        <input
          type="text"
          required
          className="address-input"
          placeholder="Area/Village"
          value={address?.area}
          onChange={(e) => setData(e.target.value, "area")}
        />
        <input
          type="text"
          required
          className="address-input"
          placeholder="Street Address"
          value={address?.streetAddress}
          onChange={(e) => setData(e.target.value, "streetAddress")}
        />
       
        <input
          type="number"
          required
          className="address-input"
          placeholder="PIN code"
          value={address?.pincode}
          onChange={(e) => setData(e.target.value, "pincode")}
        />
       
      </div>
      <div className="popup-footer-cnt">
        <div
          className="popup-footer-btn"
          style={{ backgroundColor: checkChange() ? "black" : "gray" }}
          onClick={handleSubmit}
        >
          Save
        </div>
      </div>
    </div>
  );
};

export default EditAddress;
