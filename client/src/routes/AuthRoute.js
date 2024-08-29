// import PrivateRoute from "./private/privateRoutes";
// import PublicRoutes from "./public/publicRoutes";
import { useAuth } from "../context/authContext";
import { useEffect, useState } from "react";
import OwnerRoutes from "./private/ownerRoutes/ownerRoutes";
import GuestRoutes from "./private/guestRoutes/guestRoutes";
import { useDispatch } from "react-redux";
import { RequestPermission } from "../firebase/firebaseConnection";
import { updateProfile } from "../redux/features/actions/authentication";

const AuthRoute = () => {
  const authenticated = useAuth()?.userData?.authenticated;
  const userInfo = useAuth()?.userData;
  const [userType, setUserType] = useState(userInfo?.userType);
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("looping dispatch")
    if (userInfo) {
      const token = RequestPermission();
      token
        .then((currentToken) => {
          dispatch(
            updateProfile({
              userType: userInfo?.userType,
              userId: userInfo?._id,
              fcmToken: currentToken,
            })
          );
        })
        .catch((err) => {
          console.log("Error occured,", err);
        });
    }
  }, [dispatch,userInfo]);

  useEffect(() => {
    if (userInfo) setUserType(userInfo?.userType);
  }, [userInfo]);

  console.log("hello")

  return authenticated && (userType === "Admin" || userType === "Manager" ||userType === "Staff") ? (
    <OwnerRoutes />
  ) : (
    <GuestRoutes />
  );
};

export default AuthRoute;
