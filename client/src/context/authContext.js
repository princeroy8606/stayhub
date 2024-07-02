import React, { createContext, useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const Data = useSelector((state) => state.authReducer?.userData?.userResponse);
  
  const [userData, setUserData] = useState(null);
  const [toggleStorage, setToggleStorage] = useState(false);

  const storeData = () => {
    try {
      setToggleStorage(!toggleStorage);
      localStorage.setItem("userData", JSON.stringify(Data));
    } catch (err) {
      console.log(err);
    }
  };

  const isLogedIn = () => {
    try {
      const user = localStorage.getItem("userData");
      user && setUserData(JSON.parse(user));
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    try {
      localStorage.removeItem("userData");
      setUserData(null);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Data) storeData();
  }, [Data]);

  useEffect(() => {
    isLogedIn();
  }, [toggleStorage]);

  return (
    <AuthContext.Provider value={{ userData, logout }}>{children}</AuthContext.Provider>
  );
};
