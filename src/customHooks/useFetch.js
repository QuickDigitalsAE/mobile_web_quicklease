import { useEffect, useState, useRef } from "react";
import http from "../services/httpServices";
import config from "../services/config.json";
import { useNavigate } from "react-router-dom";
import { getTokenSession, removeTokenSession } from "../utils/common";
const useFetch = (url) => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const authentication = getTokenSession();
  const isComponentMounted = useRef(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (isComponentMounted.current) {
      getData();
    }
    return () => {
      isComponentMounted.current = false;
      setData(null);
      setLoading(true);
      setError("");
    };
  }, []);

  const getData = async () => {
    try {
      const { data } = await http.get(`${config.apiEndPoint}${url}`, {
        headers: {
          Authorization: `Bearer ${authentication}`,
        },
      });
      if (
        data.status === 401 &&
        data.message === "Unauthenticated." || data.message === "Invalid Password!"
        ) {
          removeTokenSession();
          navigate(`/${config.demo}login`);
        }
        setData(data);
        setLoading(false);
      } catch (e) {
        if(e.response) {
          if( e?.response?.status === 401 || e?.data?.message === "Unauthenticated.") {
            removeTokenSession();
            navigate(`/${config.demo}login`);
          }
        }
      setLoading(true);
      setError(e)
    }
  };

  return {
    loading,
    data,
    error,
  };
};
export default useFetch;
