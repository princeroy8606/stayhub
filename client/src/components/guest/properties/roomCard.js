import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import assets from "../../../assets/assets";
import { useDispatch } from "react-redux";
import { updateWishList } from "../../../redux/features/actions/guestActions";
import { useAuth } from "../../../context/authContext";

const RoomCard = ({ houseData, searchData, liked }) => {
  const Navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const Data = { houseData, searchData };
  const [isLiked, setIsLiked] = useState(liked);

  const handleLike = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (isLiked !== liked)
      dispatch(
        updateWishList({
          GuestId: userData?._id,
          type: isLiked ? "add" : "remove",
          houseId: houseData?._id,
          houseName: houseData?.name?.title,
        })
      );
  }, [isLiked, dispatch, userData?._id, houseData?._id, houseData?.name?.title, liked]);
  return (
    <div
      className="room-card"
      onClick={() => Navigate("room-details", { state: { data: Data } })}
    >
      <div className="img-cnt">
        <img
        alt=""
          src={`${process.env.REACT_APP_BASEURL}${houseData?.images[0]?.url}`}
          className="house-img"
        />
      </div>
      <div className="room-specification">
        <h3>{houseData?.name?.title}</h3>
        <div className="room-duration">
          <h5>No of rooms : {houseData?.capacity?.bedrooms}</h5>
          <h5> location : {houseData?.address?.area}</h5>
        </div>
        <div className="room-duration">
          <h4>Price: {houseData?.rentPerDay} </h4>
          {userData && (
            <div className="like-btn-cnt" onClick={handleLike}>
              <svg
                viewBox="0 0 24 24"
                width="100%"
                height="100%"
                fill={isLiked ? "red" : "none"}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
                    stroke={isLiked ? "none" : "black"}
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>
                </g>
              </svg>
              {/* <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" id="heart"><path fill="#f05542" d="M5.301 3.002c-.889-.047-1.759.247-2.404.893-1.29 1.292-1.175 3.49.26 4.926l.515.515L8.332 14l4.659-4.664.515-.515c1.435-1.437 1.55-3.634.26-4.926-1.29-1.292-3.483-1.175-4.918.262l-.516.517-.517-.517C7.098 3.438 6.19 3.049 5.3 3.002z"></path></svg> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
