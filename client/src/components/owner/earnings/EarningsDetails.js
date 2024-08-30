import React, { useEffect } from "react";
import assets from "../../../assets/assets";
import AnimatedNumber from "react-animated-numbers";
import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../context/authContext";
import { EarningsData } from "../../../redux/features/actions/ownerActions";

const EarningsDetails = () => {
  const dispatch = useDispatch();
  const { userData } = useAuth();
  const data = useSelector((state) => state?.ownerReducer?.EarningsData);

  useEffect(() => {
    console.log(data);
    if (!data) dispatch(EarningsData(userData?._id));
  }, [data,userData?._id,dispatch]);

  const dateFormater = (timestamp) => {
    const dateObject = new Date(timestamp * 1000);
    const date = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${date}/${month}/${year}`;
  };

  return (
    <div className="dashboard-cnt property">
      <div className="dashboard-top">
        <h2 className="dashboard-head-text">Earnings</h2>
      </div>
      <div className="summary">
        <h2 style={{ color: "#64656D" }}>Summary</h2>
      </div>
      <div className="revenue-details">
        <div className="revenue-cnt">
          <div className="total-earning">Total Earnings</div>
          <div className="amount">
            <img alt="" src={assets.Images.dollar} className="amount-img" />
            <AnimatedNumber
              includeComma
              animateToNumber={data?.balance || 0}
              fontStyle={{ fontSize: 26, fontWeight: 800 }}
              locale="en-US"
              configs={[
                { mass: 1, tension: 250, friction: 100 },
                { mass: 1, tension: 120, friction: 50 },
              ]}
            />
          </div>
        </div>
        <div className="revenue-cnt" style={{ backgroundColor: "#A6ABFF" }}>
          <div className="total-earning">Last Months Earnings</div>
          <div className="amount">
            <img alt="" src={assets.Images.dollar} className="amount-img" />
            <AnimatedNumber
              includeComma
              animateToNumber={data?.lastMonthEarnings || 0}
              fontStyle={{ fontSize: 26, fontWeight: 800 }}
              locale="en-US"
              configs={[
                { mass: 1, tension: 250, friction: 100 },
                { mass: 1, tension: 120, friction: 50 },
              ]}
            />
          </div>
        </div>
      </div>
      <div className="payment-lists">
        <div
          className="list-headers"
          style={{ position: "sticky", top: 0, background: "#e2a8a4" }}
        >
          <h5 className="payment-list-item" style={{ width: "5%" }}>
            SINo
          </h5>
          <h5 className="payment-list-item">Capture Method</h5>
          <h5 className="payment-list-item">Amount</h5>
          <h5 className="payment-list-item">date</h5>
          <h5 className="payment-list-item">Bank</h5>
          <h5 className="payment-list-item">Status</h5>
        </div>
        {data?.paymnets?.map((payment, index) => (
          <div className="list-headers" key={index}>
            <p className="payment-list-item" style={{ width: "5%" }}>
              {index + 1}
            </p>
            <p className="payment-list-item">{payment.method}</p>
            <p className="payment-list-item">₹ {payment.amount}</p>
            <p className="payment-list-item">{`${dateFormater(
              payment.created_at
            )}`}</p>
            <p className="payment-list-item">{payment.bank}</p>
            <p className="payment-list-item">{payment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EarningsDetails;
