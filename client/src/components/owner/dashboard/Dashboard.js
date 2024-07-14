import React, { useEffect, useState } from "react";
import { PieChart } from "react-minimal-pie-chart";
import assets from "../../../assets/assets";
import { useAuth } from "../../../context/authContext";
import EarningsBarChart from "./BarChart";
import { useDispatch, useSelector } from "react-redux";
import { getDashboardData } from "../../../redux/features/actions/ownerActions";
import { Skeleton } from "@mui/material";
import BookingsLineChart from "./LineChart";

const Dashboard = () => {
  const { userData } = useAuth();
  const Datas = useSelector((state) => state?.ownerReducer?.chartDatas);
  const today = new Date();
  const monthCodes = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="dashboard-cnt">
      <div className="dashboard-top">
        <h2 className="dashboard-head-text">Dashboard</h2>
        <h4 style={{ color: "white", fontWeight: 300 }}>{`${
          daysOfWeek[today.getDay()]
        } / ${monthCodes[today.getMonth()]} / ${today.getFullYear()}`}</h4>
      </div>
      {Datas ? (
        <div className="dashboard-contents">
          <div className="status-cnt">
            <h2>Welcome {userData?.name}</h2>
            <h5>This is your property portfolio report</h5>
            <div className="piechart-cnt">
              <PieChart
                className="piechart"
                data={[
                  {
                    title: `available: ${Datas?.pieChartValues?.availabe} houses`,
                    value: Datas?.pieChartValues?.availabe,
                    color: "#fbff00",
                  },
                  {
                    title: `occupied: ${Datas?.pieChartValues?.occupied} houses`,
                    value: Datas?.pieChartValues?.occupied,
                    color: "black",
                  },
                  {
                    title: `booked: ${Datas?.pieChartValues?.booked} houses`,
                    value: Datas?.pieChartValues?.booked,
                    color: "#17ab77",
                  },
                ]}
              />
              <div className="pichart-details">
                <div className="total-rooms">
                  <p>The total Accomodations</p>
                  <h1>{Datas?.pieChartValues?.TotalHouses}</h1>
                </div>
                <div className="pichart-info-cnt">
                  <div
                    className="pichart-info"
                    style={{ borderLeft: "3px solid #f1d747" }}
                  >
                    <p>Available houses : {Datas?.pieChartValues?.availabe}</p>
                  </div>
                  <div
                    className="pichart-info"
                    style={{ borderLeft: "3px solid #80cb10" }}
                  >
                    <p>Occupied houses : {Datas?.pieChartValues?.occupied}</p>
                  </div>
                  <div
                    className="pichart-info"
                    style={{ borderLeft: "3px solid #17ab77" }}
                  >
                    <p>Booked houses : {Datas?.pieChartValues?.booked}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="status-image-cnt">
            <img
              className="status-image"
              alt="image"
              src={assets.Images.dashboard_img}
            />
          </div>
        </div>
      ) : (
        <Skeleton
          width={"90%"}
          height={"50rem"}
          animation={"wave"}
          sx={{ bgcolor: "white.400" }}
        />
      )}
      {Datas ? (
        <div className="dashboard-contents">
          {Datas?.paymentList && (
            <EarningsBarChart
              Dataset={Datas?.paymentList}
              monthCodes={monthCodes}
            />
          )}
          {Datas?.bookingList && (
            <BookingsLineChart
              Dataset={Datas?.bookingList}
              monthCodes={monthCodes}
            />
          )}
        </div>
      ) : (
        <Skeleton
          width={"90%"}
          height={"100%"}
          animation={"wave"}
          sx={{ bgcolor: "white.400" }}
        />
      )}
    </div>
  );
};

export default Dashboard;
