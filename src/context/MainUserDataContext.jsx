import React, { useState, createContext, useEffect } from "react";

export const MainUserDataContext = createContext();

const MainUserDataProvider = ({ children,data }) => {
  const [userdata, setUserdata] = useState(null);
useEffect(() => {
setUserdata(data)
}, [data])



  return (
    <MainUserDataContext.Provider value={{ userdata }}>
      {children}
    </MainUserDataContext.Provider>
  );
};

export default MainUserDataProvider;
