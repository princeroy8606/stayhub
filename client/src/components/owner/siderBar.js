// Importing necessary modules and assets
import React from "react";
import assets from "../../assets/assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

// Defining the Sidebar component
const SiderBar = () => {
  // Accessing user data and current location from the context and React Router
  const { userData } = useAuth();
  const Location = useLocation();
  const Navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    Navigate("/");
    logout();
  };
  console.log(userData);
  return (
    <div className="sidebar-cnt">
      <div className="siderbar-title">
        <img
        alt=""
          src={assets.Images.logo_Black}
          style={{ width: "80%", height: "70%", objectFit: "contain" }}
        />
      </div>
      <div className="sidbar-profile-cnt">
        <div
          className="sidbar-profile-cover"
          onClick={() => Navigate("/profile")}
        >
          <img
            className="sidebar-profile-img"
            src={assets.Images.female_Avatar}
            alt="User Profile"
          />
          <div className="sidebar-profile">
            <h4>{userData?.name}</h4>
            <p>{userData?.userType}</p>
          </div>
        </div>
      </div>
      <div className="sidebar-nav-cnt">
        <div
          className={
            Location.pathname === "/" ? "sidebar-nav-active" : "sidebar-nav"
          }
          onClick={() => Navigate("/")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/"
                  ? assets.Images.dashboardFocused
                  : assets.Images.dashboard
              }
              alt="Dashboard"
            />
            <h4
              style={{
                color: Location?.pathname === "/" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Dashboard
            </h4>
          </div>
        </div>
        <div
          className={
            Location.pathname === "/propertys"
              ? "sidebar-nav-active"
              : "sidebar-nav"
          }
          onClick={() => Navigate("/propertys")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/propertys"
                  ? assets.Images.houseFocused
                  : assets.Images.house
              }
              alt="My Properties"
            />
            <h4
              style={{
                color:
                  Location?.pathname === "/propertys" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Properties
            </h4>
          </div>
        </div>
        <div
          className={
            Location.pathname === "/bookings"
              ? "sidebar-nav-active"
              : "sidebar-nav"
          }
          onClick={() => Navigate("/bookings")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/bookings"
                  ? assets.Images.bookingFocused
                  : assets.Images.booking
              }
              alt="Bookings"
            />
            <h4
              style={{
                color:
                  Location?.pathname === "/bookings" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Bookings
            </h4>
          </div>
        </div>
        <div
          className={
            Location.pathname === "/earnings"
              ? "sidebar-nav-active"
              : "sidebar-nav"
          }
          onClick={() => Navigate("/earnings")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/earnings"
                  ? assets.Images.WalletFocused
                  : assets.Images.Wallet
              }
              alt="Earnings"
            />
            <h4
              style={{
                color:
                  Location?.pathname === "/earnings" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Earnings
            </h4>
          </div>
        </div>

        <div
          className={
            Location.pathname === "/employees"
              ? "sidebar-nav-active"
              : "sidebar-nav"
          }
          onClick={() => Navigate("/employees")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/employees"
                  ? assets.Images.employees_focused
                  : assets.Images.employees_icon
              }
              alt="employees"
            />
            <h4
              style={{
                color:
                  Location?.pathname === "/employees" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Employees
            </h4>
          </div>
        </div>
        <div
          className={
            Location.pathname === "/managers"
              ? "sidebar-nav-active"
              : "sidebar-nav"
          }
          onClick={() => Navigate("/managers")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/managers"
                  ? assets.Images.managersFocused
                  : assets.Images.manager_icon
              }
              alt="Earnings"
            />
            <h4
              style={{
                color:
                  Location?.pathname === "/managers" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Managers
            </h4>
          </div>
        </div>

        <div
          className={
            Location.pathname === "/users"
              ? "sidebar-nav-active"
              : "sidebar-nav"
          }
          onClick={() => Navigate("/users")}
        >
          <div className="sidebar-nav-cover">
            <img
              className="sidebar-nav-icon"
              src={
                Location.pathname === "/users"
                  ? assets.Images.users_icon_focused
                  : assets.Images.users_icon
              }
              alt="employees"
            />
            <h4
              style={{
                color: Location?.pathname === "/users" ? "#232628" : "#54575c",
                fontWeight: "600",
              }}
            >
              Users
            </h4>
          </div>
        </div>

      </div>
        <div
          className='log-out-btn'
        >
          <div className="sidebar-nav-cover" onClick={() => handleLogout()}>
            <img
              className="sidebar-nav-icon"
              src={assets.Images.exit}
              alt="Log out"
            />
            <h4 style={{ color: "black", fontWeight: "600" }}>Log out</h4>
          </div>
        </div>
    </div>
  );
};

export default SiderBar;
