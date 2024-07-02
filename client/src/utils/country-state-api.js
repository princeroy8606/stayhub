import axios from "axios";

export const AllCountrys = async () => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries/states"
    );
    const filterdData = response?.data?.data;
    return filterdData.slice(0, 241);
  } catch (err) {
    console.log(err);
  }
};

export const AllCities = async (state,country) => {
  const options={
    "country": country,
    "state": state
}
  try {
    const response = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",options
    );
    console.log(response)
    const filterdData = response?.data?.data;
    return filterdData
  } catch (err) {
    console.log(err);
  }
};

// export const AllStates = async (country) => {
//   console.log("states-api-triggerd",country);
//   try {
//     const response = await axios.post(
//       "https://countriesnow.space/api/v0.1/countries/states",
//       country
//     );
//     console.log("api-res:", response);
//     return response;
//   } catch (err) {
//     console.log(err);
//   }
// };
