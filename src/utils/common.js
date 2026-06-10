// return the token from the session storage
export const getTokenSession = () => {
    return localStorage.getItem("token") || null;
  };
export const getNameSession = () => {
    return localStorage.getItem("name") || null;
  };
  
  // remove the token and user from the session storage
  export const removeTokenSession = () => {
    localStorage.clear();
  };
  
  // set the token and user from the session storage
  export const setTokenSession = (token) => {
    localStorage.setItem("token", token);
  };
  export const setNameSession = (name) => {
    localStorage.setItem("name", name);
  };
