import React, { useState, createContext } from "react";

export const MainLanguageContext = createContext();

const MainLanguageProvider = ({ children }) => {
  const [mainLanguage, setMainLanguage] = useState("en");

  const handlelanguage = (lang) => {
    document.body.className = ""; // Reset the body class
    document.body.classList.add(lang); // Add the new language class
    setMainLanguage(lang);

    
  };

  return (
    <MainLanguageContext.Provider value={{ mainLanguage, handlelanguage }}>
      {children}
    </MainLanguageContext.Provider>
  );
};

export default MainLanguageProvider;
