import React, { useState, createContext } from "react";

export const MainProfileContext = createContext();

const MainProfileProvider = ({ children }) => {
  const [profileData, setProfileData] = useState("");

  const handleProfileData = (data) => {
    setProfileData(data);
  };

  return (
    <MainProfileContext.Provider value={{ profileData, handleProfileData }}>
      {children}
    </MainProfileContext.Provider>
  );
};  

export default MainProfileProvider;
