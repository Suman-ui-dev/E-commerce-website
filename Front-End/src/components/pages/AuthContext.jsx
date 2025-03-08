import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (userData) => {
    console.log("Updating currentUser:", userData); // Debugging log
    setCurrentUser(userData); // Update currentUser state
  };

  const logout = () => {
    setCurrentUser(null); // Clear the current user on logout
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);