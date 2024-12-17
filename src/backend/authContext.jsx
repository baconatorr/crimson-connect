// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext); // Custom hook to use context
};

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(true); // For initial state check

  const auth = getAuth();

  useEffect(() => {
    // Check auth state on page load
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setNotification("Welcome back!");
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false); // Done checking
    });

    return unsubscribe; // Cleanup listener on unmount
  }, [auth]);

  const logIn = () => {
    setIsLoggedIn(true);
    setNotification("Logged in successfully!");
  };

  const logOut = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      setNotification("Logged out.");
    } catch (error) {
      console.error("Log out error:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, logIn, logOut, notification, setNotification }}
    >
      {!loading && children} {/* Prevent rendering until auth state is loaded */}
    </AuthContext.Provider>
  );
};
