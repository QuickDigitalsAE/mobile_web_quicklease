import React, { useState, createContext, useEffect } from "react";

export const MainPermissionContext = createContext();

const MainPermissionProvider = ({ children,data }) => {
    const [permissionlist, setPermissionlist] = useState(null);
  useEffect(() => {
  setPermissionlist(data)
  }, [data])
  

  return (
    <MainPermissionContext.Provider  value={{ permissionlist }}>
      {children}
    </MainPermissionContext.Provider>
  );
};  

export default MainPermissionProvider;
