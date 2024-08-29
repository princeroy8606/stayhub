import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  newPassword,
  otpVerification,
  sendOTPtoMail,
} from "../../../redux/features/actions/authentication";

import { isStrongPassword, isValidEmail } from "../../../utils/validityChecks";

const ForgotPassword = ({ handleFunction, UserType }) => {
  const [email, setEmail] = useState(null);
  const [index, seIndex] = useState(0);
  const [btnValue, setBtnValue] = useState("Send OTP");
  const [otp, setOtp] = useState(null);
  const [error, setError] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

  const isOtpSent = useSelector((state) => state.authReducer?.mailVerification);
  const passwordStatus = useSelector(
    (state) => state.authReducer?.passwordUpdate
  );
  const isOtpCorrect = useSelector(
    (state) => state.authReducer?.otpVerification
  );

  const sendOTP = () => {
    setError(null)
    if (!isValidEmail(email)) return setError("Email invalid , enter valid email");
    dispatch(sendOTPtoMail({ UserType: UserType, Email: email }));
  };

  const verifyOTP = () => {
    if (!otp) return setError("OTP must be filled");
    dispatch(otpVerification({ Id: isOtpSent?.tokenId, otp: otp }));
  };

  const updatePassword = () => {
    if (!isStrongPassword(password)) return setError("Password is not Strong Enough !");
    dispatch(
      newPassword({ userType: UserType, password: password, Email: email })
    );
  };

  useEffect(() => {
    if (index === 0 && isOtpSent?.verified === true) {
      setBtnValue("Verify");
      seIndex(1);
      setError(null);
    }
    if (index === 1 && isOtpCorrect?.verified === true) {
      setBtnValue("Submit");
      seIndex(2);
      setError(null);
    }
    if (index === 2 && passwordStatus?.verified === true) {
      setError(null);
      handleFunction();
    }

    console.log(passwordStatus);
  }, [isOtpSent, isOtpCorrect, passwordStatus,index,handleFunction,]);

  const handleClick = () => {
    if (index === 0) {
      sendOTP();
    } else if (index === 1) {
      verifyOTP();
    } else if (index === 2) {
      updatePassword();
    }
  };

  const handleCheck = (e) => {
    setError(null)
    if (password !== e.target.value) {
      setError("password Mismatch");
    } else if (password.length < 8) {
      setError("password should have 8 characters");
    } else {
      setError(null);
    }
  };

  const manageEelemnt = () => {
    switch (index) {
      case 0:
        return (
          <div className="email-cnt">
            {error && <div className="error-message">{error}</div>}
            <h3>Email</h3>
            <input
              type="text"
              className="login-input-box"
              style={{borderColor:error ? "red":null}}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        );
      case 1:
        return (
          <div className="email-cnt">
            <h3>OTP</h3>
            <p>Enter the OTP sent to your Email</p>
            {error && <div className="error-message">{error}</div>}
            <input
              type="number"
              className="login-input-box"
              style={{borderColor:error ? "red":null}}
              onChange={(e) => setOtp(e.target.value)}
            />
          </div>
        );
      case 2:
        return (
          <div className="new-password-cnt">
            {error && <div className="error-message">{error}</div>}
            <div className="email-cnt">
              <h3>New Password</h3>
              <input
                type="password"
                className="login-input-box"
                style={{borderColor:error ? "red":null}}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="email-cnt">
              <h3>Conform Password</h3>
              <input
                type="password"
                className="login-input-box"
                style={{borderColor:error ? "red":null}}
                onChange={handleCheck}
              />
            </div>
          </div>
        );
        default:
          console.warn(`Unexpected index: ${index}`);
          break;
    }
  };

  return (
    <div className="forgot-password">
      {manageEelemnt()}
      <div className="small-btn" onClick={handleClick}>
        {btnValue}
      </div>
    </div>
  );
};

export default ForgotPassword;
