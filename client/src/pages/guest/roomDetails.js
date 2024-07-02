import React, { useEffect, useState } from "react";
import assets from "../../assets/assets";
import { useLocation } from "react-router-dom";
import RentDetails from "../../components/guest/bookings/rentDetails";
import { useAuth } from "../../context/authContext";
import VerticalNavBar from "../../components/guest/verticalNavBar";
import Footer from "../../components/global/Footer";

const RoomDetails = () => {
  const { userData } = useAuth();
  const recevedData = useLocation()?.state?.data;
  console.log(recevedData);
  const houseData = recevedData?.houseData;
  const [reviews, setReviews] = useState(houseData?.reviews);
  const [isFilterActive, setIsFilsterActive] = useState(false);

  const searchData = {
    amount: houseData?.rentPerDay,
    data: recevedData?.searchData,
    houseId: houseData?._id,
    houseDetails: houseData,
  };

  const getDate = (date) => {
    const originalDate = new Date(date);
    return `${originalDate.getDate()}/${
      originalDate.getMonth() + 1
    }/${originalDate.getFullYear()}`;
  };

  const displayStar = (count) => {
    return Array.from({ length: count }, (_, index) => (
      <div key={index}>⭐</div>
    ));
  };

  const totalRaiting = () => {
    let total = 0;
    houseData?.reviews.forEach((review) => {
      total += review.raiting;
    });
    return (total / houseData?.reviews?.length).toFixed(1);
  };

  const FilterTopRated = houseData?.reviews
    .slice()
    .sort((a, b) => b.raiting - a.raiting);

  useEffect(() => {
    if (isFilterActive) {
      setReviews(FilterTopRated);
    } else {
      setReviews(houseData?.reviews);
    }
  }, [isFilterActive]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="guest-home-bg" style={{ height: "auto" }}>
      <div className="nav-cover-cnt">
        <VerticalNavBar theme={"black"} img={"black"} />
      </div>
      <div className="houseDetails-cover">
        <div className="roomdetails-split-cnt">
          <div className="roomdetails-split-left">
            <div className="room-details-cnt">
              <div className="room-details">
                <div className="room-img-cnt">
                  <img
                    src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
                    className="room-img-right"
                  />
                  <img
                    src={`${process.env.REACT_APP_BASEURL}${houseData?.images[1]?.url}`}
                    className="room-img"
                  />
                  <img
                    src={`${process.env.REACT_APP_BASEURL}${houseData?.images[2]?.url}`}
                    className="room-img"
                    // style={{borderRadius:"1rem 0 1rem 0"}}
                  />
                </div>
              </div>
            </div>
            <div className="specifications-cnt">
              <div className="house-deatils-cnt">
                <div className="house-name-txt">{houseData?.name?.title}</div>
                <div className="house-capacity">
                  <span className="capacity-txt">
                    {houseData?.capacity?.guests} guests
                  </span>
                  |
                  <span className="capacity-txt">
                    {houseData?.capacity?.bedrooms} bedrooms
                  </span>
                  |
                  <span className="capacity-txt">
                    {houseData?.capacity?.beds} beds
                  </span>
                  |
                  <span className="capacity-txt">
                    {houseData?.capacity?.bathrooms} bathrooms
                  </span>
                </div>
                <div className="location-txt">
                  {houseData?.address?.streetAddress}
                </div>
                {/* <div className="raiting-cnt">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="black"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="raiting-star"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                  <span>4.3</span>
                </div> */}
              </div>
              <div className="discribtion-cnt">
                <div className="discribtion">
                  {houseData?.name?.description}
                </div>
              </div>
              <div className="house-aminities-cnt">
                <div className="house-amenities-txt">
                  What This Place Offers
                </div>
                <div className="house-amenities">
                  {houseData?.aminities?.map((amenitie, index) =>
                    amenitie.available ? (
                      <div className="amenitie-detail" key={index}>
                        <img src={amenitie?.icon} className="aneminite-img" />
                        <div className="anenitie-name">
                          {amenitie?.amenitie}
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="roomdetails-split-right">
            <RentDetails RentData={searchData} />
          </div>
        </div>
      </div>
      <div className="housedetails-reviews-cnt">
        <div className="housedetails-reviews-cover">
          <div className="raiting-review-cnt">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="white"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="black"
                className="raiting-star"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                />
              </svg>
              <span style={{ color: "black", fontWeight: 600 }}>
                {totalRaiting()} , {houseData?.reviews?.length} reviews
              </span>
            </div>
            <div className="review-filter-cnt">
              <div
                className="review-filter-btn"
                onClick={() => setIsFilsterActive(true)}
                style={{
                  background: isFilterActive && "black",
                  color: isFilterActive && "white",
                }}
              >
                Top Rated
              </div>
              <div
                className="review-filter-btn"
                onClick={() => setIsFilsterActive(false)}
                style={{ background: !isFilterActive && "#d4e4ff" }}
              >
                Recent
              </div>
            </div>
          </div>
          <div className="review-list-cnt">
            {reviews?.map((review) => (
              <div className="review-contents">
                <div className="review-profile-cnt">
                  <div className="review-profile">
                    {review.name[0].toUpperCase()}
                  </div>
                  <div className="profile-date-cnt">
                    <div>{review?.name}</div>
                    <div>{getDate(review?.date)}</div>
                  </div>
                </div>
                <div className="review-description">{review?.review}</div>
                <h3 className="user-raiting">{displayStar(review?.raiting)}</h3>
              </div>
            ))}
            {reviews.length === 0 && (
              <div>
                <h1 style={{color:"GrayText", fontWeight:"400"}}>No Reviews yet ⊘</h1>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RoomDetails;
