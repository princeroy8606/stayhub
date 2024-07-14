import React, { useState } from "react";
import { useAuth } from "../../context/authContext";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/features/actions/authentication";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { userData, logout } = useAuth();
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  const [isEditing, setIsEditing] = useState({
    UserName: false,
    Email: false,
    Phone: false,
    Password: false,
  });

  const [userDetails, setUserDetails] = useState({
    UserName: userData?.name,
    Email: userData?.email,
    Phone: userData?.phone,
    Password: null,
    userId: userData?._id,
    userType: userData?.userType,
  });
  const [error, setError] = useState(null);

  const toggleEditing = (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: !prevEditing[field],
    }));
  };

  const toggleButton = (field) => {
    return isEditing[field] ? (
      <div className="edit-btn save-btn" onClick={() => handleSave(field)}>
        save
      </div>
    ) : (
      <div className="edit-btn" onClick={() => toggleEditing(field)}>
        Edit
      </div>
    );
  };

  const handleSave = (field) => {
    toggleEditing(field);
    const isValid = emailPattern.test(userDetails?.Email);
    if (!isValid) setError("The Email ID is invalid");
    setError(null);
    dispatch(updateProfile(userDetails));
  };

  const createIcon = () => {
    return userData?.name?.split("")[0];
  };

  const handlelogout = () => {
    Navigate("/");
    logout();
  };

  return (
    <div className="profile-cnt">
      <div className="profile-cover">
        <div className="profile-left">
          <div className="profile-box">
            <div className="profile-image">{createIcon()}</div>
            <div>
              <h3>{userData?.name}</h3>
              <h4>{userData?.userType}</h4>
            </div>
          </div>
          <div className="log-out-btn" onClick={() => handlelogout()}>
            Log out
          </div>
        </div>
        <div className="profile-right">
          <div className="user-details-cnt">
            <div className="user-info">
              <div className="user-info-left">
                <h3>UserName</h3>
                <input
                  value={userDetails?.UserName}
                  readOnly={isEditing?.UserName ? false : true}
                  onChange={(e) =>
                    setUserDetails((prevDetails) => ({
                      ...prevDetails,
                      UserName: e.target.value,
                    }))
                  }
                />
              </div>
              {toggleButton("UserName")}
            </div>
            <div className="user-info">
              <div className="user-info-left">
                <h3>Email</h3>
                {error && <div className="error-message">{error}</div>}
                <input
                  value={userDetails?.Email}
                  readOnly={isEditing?.Email ? false : true}
                  onChange={(e) =>
                    setUserDetails((prevDetails) => ({
                      ...prevDetails,
                      Email: e.target.value,
                    }))
                  }
                />
              </div>
              {toggleButton("Email")}
            </div>
            <div className="user-info">
              <div className="user-info-left">
                <h3>Phone</h3>
                <input
                  value={userDetails?.Phone}
                  readOnly={isEditing?.Phone ? false : true}
                  onChange={(e) =>
                    setUserDetails((prevDetails) => ({
                      ...prevDetails,
                      Phone: e.target.value,
                    }))
                  }
                />
              </div>
              {toggleButton("Phone")}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
