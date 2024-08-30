import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { axisClasses } from "@mui/x-charts/ChartsAxis";

const EarningsBarChart = ({ Dataset ,monthCodes}) => {
  const chartSetting = {
    yAxis: [
      {
        label: "Amount (rs)",
      },
    ],
    width: 400,
    height: 300,
    sx: {
      [`.${axisClasses.left} .${axisClasses.label}`]: {
        transform: "translate(-55px, 0)",
      },
    },
  };
  const valueFormatter = (value) => `₹ ${value}`;
  return (
    <>
      <BarChart
        dataset={Dataset}
        xAxis={[{ scaleType: "band", data: monthCodes }]}
        series={[
          { dataKey: "Earnings", label: "Earnings", valueFormatter },
          { dataKey: "profit", label: "profit", valueFormatter },
        ]}
        {...chartSetting}
      />
    </>
  );
};

export default EarningsBarChart;
