import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginAction } from "../../../redux/features/actions/authentication";
import ForgotPassword from "./forgotPassword";
import assets from "../../../assets/assets";
import { CircularProgress } from "@mui/material";

const LoginCard = ({ setAuthType }) => {
  const [userType, setUserType] = useState("guest");
  const [email, setEmail] = useState("princeroy8606@gmail.com");
  const [password, setPassword] = useState("123@Adgjmptw");
  const [forgotPassword, setForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [processInitiated,setProcessInitiated] = useState(false)


  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  function isValidEmail(mail) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log(emailRegex.test(mail));
    return emailRegex.test(mail);
  }

  const handleLogin = () => {
    setError(null);
    if (!email || password.length < 8 || !isValidEmail(email))
      return setError({
        error: true,
        type: "email",
        message: "Enter your Email",
      });
    let loginData = { UserType: userType, Email: email, Password: password };
    dispatch(loginAction(loginData));
    setProcessInitiated(true)
  };

  return (
    <div className="login-half">
      <div className="login-card">
        <div
          className="register-title"
          style={{ fontSize: "2rem", fontWeight: 800, color: "black" }}
        >
          Welcome Back
        </div>
        <p style={{ fontSize: ".8rem", fontWeight: 300, color: "gray" }}>
          Enter your email and password to access your account
        </p>
        {forgotPassword ? (
          <ForgotPassword
            handleFunction={() => setForgotPassword(false)}
            UserType={userType}
          />
        ) : (
          <>
            <div className="login-inputs">
              <div className="login-input">
                {error && !isValidEmail(email) ? (
                  <p style={{ color: "red", fontSize: "0.8rem" }}>
                    Enter vaild Email
                  </p>
                ) : (
                  <p style={{ color: "black" }}>Email</p>
                )}

                <input
                  type="text"
                  className="login-input-box"
                  value={email}
                  style={{
                    borderColor: error && !isValidEmail(email) ? "red" : null,
                  }}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="login-input">
                {error && password.length < 8 ? (
                  <p style={{ color: "red", fontSize: "0.8rem" }}>
                    Enter vaild password
                  </p>
                ) : (
                  <p style={{ color: "black" }}>Password</p>
                )}
                <input
                  type={showPassword ? "text" : "password"}
                  className="login-input-box"
                  value={password}
                  style={{
                    borderColor: error && password.length < 8 ? "red" : null,
                  }}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ right: "1rem" }}
                >
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                    }}
                    src={
                      !showPassword
                        ? assets.Images.show_password
                        : assets.Images.hide_password
                    }
                  />
                </div>
              </div>
            </div>
            <div className="register-btn" onClick={handleLogin}>
            {processInitiated ? <CircularProgress /> :"Login" }  
            </div>
          </>
        )}
        {!forgotPassword ? (
          <div>
            <span
              className="botoom-txt"
              onClick={() => setForgotPassword(true)}
            >
              Forgot password ?..
            </span>
            {" or "}
            <span
              className="botoom-txt"
              onClick={setAuthType}
              style={{
                color: "gray",
                textDecoration: "underline",
              }}
            >
              Create New Account
            </span>
          </div>
        ) : (
          <h5 className="botoom-txt" onClick={() => setForgotPassword(false)}>
            {"<"} Back to Login
          </h5>
        )}
      </div>
    </div>
  );
};

export default LoginCard;
