import axios from "axios";

axios.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response.status === 404) {
      throw new Error(`${err.config.url} not found1`);
    }
    throw err;
  }
);
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
