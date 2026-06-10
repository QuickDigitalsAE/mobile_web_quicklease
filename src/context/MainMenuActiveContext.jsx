import React, { useState, createContext } from "react";

export const MainMenuActiveContext = createContext();

const MainMenuActiveProvider = ({ children }) => {
  const [getActive, setGetActive] = useState(false);

  const handleGetEditValue = (status) => {
    setGetActive(status);
  };

  return (
    <MainMenuActiveContext.Provider value={{ getActive, handleGetEditValue }}>
      {children}
    </MainMenuActiveContext.Provider>
  );
};  

export default MainMenuActiveProvider;
