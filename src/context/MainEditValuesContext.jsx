import React, { useState, createContext } from "react";

export const MainEditValuesContext = createContext();

const MainEditValuesProvider = ({ children }) => {
  const [getEditValue, setGetEditValue] = useState(null);

  const handleGetEditValue = ({...props}) => {
    setGetEditValue(props);
  };

  return (
    <MainEditValuesContext.Provider value={{ getEditValue, handleGetEditValue }}>
      {children}
    </MainEditValuesContext.Provider>
  );
};

export default MainEditValuesProvider;
