import React from "react";
import SiderBar from "../../components/owner/siderBar";
import UsersDetails from "../../components/owner/users/UsersDetails";

const Users = () => {
  return (
    <div className="owner-cont">
      <SiderBar />
      <UsersDetails />
    </div>
  );
};

export default Users;
