// src/context/AuthContext.js
import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to use context
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState("");

  const logIn = () => {
    setIsLoggedIn(true);
    setNotification("Logged in successfully!");
  };

  const logOut = () => {
    setIsLoggedIn(false);
    setNotification("Logged out.");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, notification, setNotification }}
    >
      {children}
    </AuthContext.Provider>
  );
};
