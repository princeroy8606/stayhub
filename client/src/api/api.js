import axios from "axios";

const API = axios.create({ baseURL: process.env.REACT_APP_BASEURL });

export const login = (loginData) => API.post("/auth/login", loginData);

export const signUp = (regData) => API.post("/auth/signup", regData);

export const OTP = (verificationData) =>
  API.post("auth/verify/email", verificationData);

export const updatePassword = (data) => API.post("auth/update/password", data);

export const OTPCheck = (data) => API.post("auth/verify/otp", data);

export const updateDetails = (data) => API.post("user/update", data);

export const likedHouses = (data) => API.get(`user/likes/${data}`);

export const updateWishList = (data) => API.post(`user/likes/update`, data);

// export const updateDetails = (data) => API.post("user/update", data);

export const getHouses = (filters) =>
  API.post("/houses/check", filters, { withCredentials: true });

export const getOwnersHouse = (employeeId) =>
  API.get(`houses/accomodations/${employeeId}`);

export const getBookingHistory = (EmployeeId) =>
  API.get(`booking/${EmployeeId}`);

export const successPaymentRes = (dataSecertId) =>
  API.post(`booking/payment-response`, dataSecertId, console.log(dataSecertId));

// Admin

export const getChartDatas = (AdminId) =>
  API.get("payments/chart", { headers: { AdminId: AdminId } });

export const getPaymetsData = (AdminId) =>
  API.get("payments/balance", { headers: { AdminId: AdminId } });

export const addEmployee = (employeeData) =>
  API.post("employee/new", employeeData, {
    headers: { AdminId: employeeData?.AdminId },
  });

export const getEmployees = (AdminId) =>
  API.get(`/employee/${AdminId}`, { headers: { AdminId: AdminId } });

export const getManagers = (AdminId) =>
  API.get(`/employee/managers/all`, { headers: { AdminId: AdminId } });

export const getUsers = (AdminId) =>
  API.get(`/employee/users/all`, { headers: { AdminId: AdminId } });

export const editEmployee = (newData) =>
  API.put("/employee/update", newData, {
    headers: { AdminId: newData?.AdminId },
  });

export const deleteEmployee = (data) =>
  API.delete(`employee/delete/${data?.Id}`, {
    headers: { AdminId: data?.AdminId },
  });

export const addHome = (homeData) => API.post("houses/new", homeData);

export const EditHome = (NewData) =>
  API.put(`houses/accomodation/edit/${NewData?.houseId}`, NewData?.data, {
    headers: { AdminId: NewData?.AdminId },
  });

export const deleteHouse = (HouseData) =>
  API.delete(`houses/accomodation/delete/${HouseData?.houseId}`, {
    headers: { AdminId: HouseData?.AdminId },
  });

export const confrimBooking = (BookingData) =>
  API.put(`booking/confirm/${BookingData?.Id}`, {
    headers: { AdminId: BookingData?.AdminId },
  });

export const checkAvailability = (bookingDetails) =>
  API.post("houses/check", bookingDetails);

export const bookHouse = (bookingData) => API.post("booking/new", bookingData);

export const cancleBooking = (BookingId) =>
  API.put(`booking/cancel/${BookingId}`);

export const addReview = (userReview) =>
  API.post("houses/newReview", userReview);

export const guestBookingHistory = (guestId) =>
  API.get(`booking/guest/${guestId}`);

export const deleteGuest = (detailsObj) => API.put("user/delete", detailsObj);
