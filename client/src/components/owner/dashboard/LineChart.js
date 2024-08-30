import React  from "react";
import { LineChart } from "@mui/x-charts/LineChart";
// import { axisClasses } from "@mui/x-charts/ChartsAxis";

const BookingsLineChart = ({ Dataset,monthCodes }) => {
  console.log(Dataset);
  const counts = [];
  Dataset.forEach((data) => {
    counts.push(data.count);
  });

  return (
    <>
      <LineChart
        xAxis={[{ data: monthCodes, label: "Months", scaleType: "point" }]}
        yAxis={[{ label: "bookings" }]}
        series={[
          {
            data: counts,
            label: "bookings per month",
            area: true,
          },
        ]}
        width={400}
        height={300}
      />
    </>
  );
};

export default BookingsLineChart;
