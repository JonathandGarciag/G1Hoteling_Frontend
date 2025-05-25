import { useState } from "react";
import { logout as logoutHandler } from "./userLogout";

const getUserDetails = () => {
  const userDetailsString = localStorage.getItem("user");
  if (userDetailsString) {
    try {
      const userDetails = JSON.parse(userDetailsString);
      return userDetails;
    } catch (e) {
      console.error("Error parseando user en localStorage", e);
      return null;
    }
  }
  return null;
};

export const useUserDetails = () => {
  const [userDetails, setUserDetails] = useState(getUserDetails());

  const logout = () => {
    logoutHandler();
    setUserDetails(null);
  };

  return {
    isLogged: Boolean(userDetails),
    username: userDetails?.username || "Guest",
    role: userDetails?.role || "Desconocido",
    hotelId: userDetails?.hotel?._id || null,
    logout,
  };
};
