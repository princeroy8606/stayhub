import React, { useEffect, useState } from "react";
import GuestRoutes from "./guestRoutes/guestRoutes";
import OwnerRoutes from "./ownerRoutes/ownerRoutes";
import { useAuth } from "../../context/authContext";
import { RequestPermission } from "../../firebase/firebaseConnection";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../redux/features/actions/authentication";

const PrivateRoute = () => {
 const {userData} = useAuth();
  const [userType, setUserType] = useState(userData?.userType);
  const dispatch = useDispatch();
  // const userData = {userType:"guest"}
  useEffect(() => {
    console.log('looping dispatch')
    if (userData?._id) {
      const token = RequestPermission();
      token
        .then((currentToken) => {
          dispatch(
            updateProfile({
              userType: userData?.userType,
              userId: userData?._id,
              fcmToken: currentToken,
            })
          );
        })
        .catch((err) => {
          console.log("Error occured,", err);
        });
    }
  }, [dispatch,userData._id,userData?.userType]);

  console.log(userType)
  
  useEffect(() => {
    // console.log(userData)
    if (userData?.userType) setUserType(userData?.userType);
  }, [userData?.userType]);

  return userData?.userType === "guest" ? <GuestRoutes /> : <OwnerRoutes />;
};

export default PrivateRoute;
