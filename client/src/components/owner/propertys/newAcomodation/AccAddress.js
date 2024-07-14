import { Autocomplete, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { AllCities, AllCountrys } from "../../../../utils/country-state-api";

const AccAddress = ({ setData }) => {
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

  return (
    <div className="block-center-form acc-address-cnt">
      <h3>Where is the Location?</h3>
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
        style={{
          padding: 0,
          boxSizing: "content-box",
          backgroundColor: "white",
        }}
      >
        <Autocomplete
          disablePortal
          options={stateData}
          getOptionLabel={(options) => options.name}
          onChange={(e, obj) => handleStateSelect(obj.name)}
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
        onChange={(e) => setData(e.target.value, "area")}
      />
      <input
        type="text"
        required
        className="address-input"
        placeholder="Street Address"
        onChange={(e) => setData(e.target.value, "streetAddress")}
      />

      {/* <input
        type="text"
        required
        className="address-input"
        placeholder="City"
        onChange={(e) => setData(e.target.value, "city")}
      /> */}

      <input
        type="number"
        required
        className="address-input"
        placeholder="PIN code"
        onChange={(e) => setData(e.target.value, "pincode")}
      />
    </div>
  );
};

export default AccAddress;
