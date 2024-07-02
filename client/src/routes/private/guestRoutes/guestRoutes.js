import React from "react";
import { Route, Routes } from "react-router-dom";
import GuestHome from "../../../pages/guest/guestHome";
import RoomDetails from "../../../pages/guest/roomDetails";
import Bookings from "../../../pages/guest/bookings";
import Profile from "../../../pages/guest/profile";
import BookedDetails from "../../../components/guest/bookings/BookedDetails";
import SuccessPayment from "../../../pages/guest/SuccessPayment";
import CancelPayment from "../../../pages/guest/CancelPayment";
import GuestDetails from "../../../pages/guest/GuestDetails";
import PayMent from "../../../pages/guest/PayMent";
import LandingPage from "../../../pages/Auth/landingPage";
import MyWishList from "../../../pages/guest/MyWishList";
import AboutUs from "../../../pages/guest/AboutUs";
import Properties from "../../../pages/guest/Properties";

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<GuestHome />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/about-us" element={<AboutUs />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/properties/room-details/guest-details" element={<GuestDetails />} />
      <Route path="/myWishlist/room-details/guest-details" element={<GuestDetails />} />
      <Route path="/payment-success" element={<SuccessPayment />} />
      <Route path="/payment-cancel" element={<CancelPayment />} />
      <Route path="/properties/room-details/" element={<RoomDetails />} />
      <Route path="/myWishlist/room-details" element={<RoomDetails />} />
      <Route path="/myBookings" element={<Bookings />} />
      <Route path="/myWishlist" element={<MyWishList />} />
      <Route path="/myBookings/booking" element={<BookedDetails />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/properties/room-details/guest-details/payment"  element={<PayMent />} />
      <Route path="/myWishlist/room-details/guest-details/payment"  element={<PayMent />} />
    </Routes>
  );
};

export default GuestRoutes;
