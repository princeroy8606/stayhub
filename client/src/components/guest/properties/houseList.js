import React, { useEffect, useState } from "react";
import RoomCard from "./roomCard";
import GuestFilterCard from "./filter/guestFilterCard";
import { useSelector } from "react-redux";
import { Skeleton } from "@mui/material";
import { useAuth } from "../../../context/authContext";

const HouseList = () => {
  const { userData } = useAuth();
  // const [day, setDay] = useState(4);
  const [isFilterOpen, setIsFilterOpen] = useState({ open: false, data: null });
  const [isSortOpen, setIsSortOpen] = useState({ open: false, type: null });
  const [isLoading, setIsLoading] = useState(true);
  const [filterdAccomodations, setFilterdAccomodations] = useState(null);

  const houseList = useSelector((state) => state.guestReducer?.houses);
  useEffect(() => {
    if (houseList) setIsLoading(false);
    // if (houseList && !filterdAccomodations)
    //   setFilterdAccomodations(houseList?`.data);
  }, [houseList, isLoading]);

  const skeletonList = [];
  for (let i = 0; i < 16; i++) {
    if (!houseList) {
      skeletonList.push(
        <div className="room-card">
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            variant="rounded"
            width={"90%"}
            height={"60%"}
            animation="wave"
            key={i}
          />
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            variant="rounded"
            width={"90%"}
            height={"5%"}
            animation="wave"
            key={i + 1}
          />
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            variant="rounded"
            width={"90%"}
            height={"5%"}
            animation="wave"
            key={i + 2}
          />
          <Skeleton
            sx={{ bgcolor: "grey.400" }}
            variant="rounded"
            width={"90%"}
            height={"5%"}
            animation="wave"
            key={i + 3}
          />
        </div>
      );
    }
  }

  const filterAminities = (houseAminities, selected) => {
    const available = houseAminities
      ?.filter((aminities) => aminities.available)
      ?.map((aminities) => aminities?.amenitie?.toLowerCase());
    return selected.every((type) => available.includes(type.toLowerCase()));
  };

  const handleFilter = (data) => {
    const filterdAccomodations = houseList?.data?.filter((houses) => {
      return (
        houses.capacity.bathrooms >= data.roomAndBedsCount?.bathrooms &&
        houses.capacity.beds >= data.roomAndBedsCount?.beds &&
        houses.capacity.bedrooms >= data.roomAndBedsCount?.bedrooms &&
        houses?.rentPerDay >= data.priceRange.min &&
        houses?.rentPerDay <= data.priceRange.max &&
        filterAminities(houses.aminities, data?.aminities)
      );
    });
    if (filterdAccomodations) setFilterdAccomodations(filterdAccomodations);
    setIsFilterOpen({ open: false, data: data });
  };

  const handleSort = (type) => {
    let sortedData = [];
    let baseData;
    if (filterdAccomodations !== null) {
      baseData = filterdAccomodations;
    } else {
      baseData = houseList?.data;
    }
    if (type === "plh")
      sortedData = [...baseData].sort((a, b) => a.rentPerDay - b.rentPerDay);
    if (type === "phl")
      sortedData = [...baseData].sort((a, b) => b.rentPerDay - a.rentPerDay);
    if (type === "rvw")
      sortedData = [...baseData].sort((a, b) => a.rentPerDay - b.rentPerDay);
    setFilterdAccomodations(sortedData);
  };
  return (
    <>
      <div className="room-list-cnt">
        <div className="room-list-header">
          <h1 style={{ color: "black", fontSize: "2.5rem" }}>
            Available Rooms ↘{" "}
          </h1>
          <div className="filter-sort-cnt">
            <div
              className="filter-btn"
              onClick={() => {
                setIsFilterOpen((prevdata) => ({
                  ...prevdata,
                  open: !isFilterOpen.open,
                }));
                setIsSortOpen((prevdata) => ({ ...prevdata, open: false }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="black"
                className="filter-svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                />
              </svg>

              <div>Filters</div>
            </div>
            <div
              className="filter-btn"
              onClick={() => {
                setIsSortOpen((prevdata) => ({
                  ...prevdata,
                  open: !isSortOpen.open,
                }));
                setIsFilterOpen((prevdata) => ({ ...prevdata, open: false }));
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 25 25"
                strokeWidth={1.5}
                stroke="currentColor"
                className="filter-svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
              <div>Sort</div>
            </div>
          </div>
          {/* {isFilterOpen.open ? ( */}
          <GuestFilterCard
            sendData={handleFilter}
            appliedFilters={isFilterOpen.data}
            opacity={isFilterOpen.open ? 1 : 0.5}
          />
          {/* ) : null} */}
          {/* {isSortOpen.open ? ( */}
          <div
            className="sort-cnt"
            style={{
              visibility: isSortOpen.open ? "visible" : "hidden",
              transform: `translateX( ${isSortOpen.open ? 0 : "10rem"})`,
              opacity: isSortOpen.open ? 1 : 0,
            }}
          >
            <div className="sort-element" onClick={() => handleSort("plh")}>
              Price - low to high{" "}
            </div>
            <div className="sort-element" onClick={() => handleSort("phl")}>
              Price - high to low{" "}
            </div>
            <div className="sort-element">Rating - Top Rated </div>
          </div>
          {/* ) : null} */}
        </div>
        <div className="room-list ">
          {filterdAccomodations
            ? filterdAccomodations?.map((house, index) => (
                <RoomCard
                  houseData={house}
                  searchData={houseList?.searchData}
                  liked={house?.likedUsers?.includes(userData?._id)}
                  key={index}
                />
              ))
            : houseList?.data.map((house, index) => (
                <RoomCard
                  houseData={house}
                  searchData={houseList?.searchData}
                  key={index + 1}
                  liked={house?.likedUsers?.includes(userData?._id)}
                />
              ))}
          {skeletonList}
        </div>
      </div>
    </>
  );
};

export default HouseList;
