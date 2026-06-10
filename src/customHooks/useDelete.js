import { getTokenSession } from "../utils/common";
import http from "../services/httpServices";
import config from "../services/config.json";
import { useState } from "react";

const useDelete = () => {
  const [res, setRes] = useState({ data: null, error: null, isLoading: false });
  const authentication = getTokenSession();
  let headers = {
    "Content-Type": "multipart/form-data",
  }
  if(authentication) {
   headers = {
    "Content-Type": "multipart/form-data",
    Authorization: `Bearer ${authentication}`,
  };
} 

  const callAPI  = async (url) => {
    setRes((prevState) => ({ ...prevState, isLoading: true }));
    http.delete(`${config.apiEndPoint}${url}`, {
        headers,
      })
      .then((res) => {
        setRes({ data: res.data, isLoading: false, error: null });
      })
      .catch((error) => {
        console.log(error?.response?.data)
        setRes({ data: error?.response?.data, isLoading: false, error });
      });
  };
  return [res, callAPI];
};
export default useDelete;
