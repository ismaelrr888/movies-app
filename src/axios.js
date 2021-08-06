import axios from "axios";

const instance = axios.create({
  baseURL: "https://mern-movies-test.herokuapp.com/api/",
  headers: {
    "x-token": localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config) => {
    config.headers = {
      "x-token": localStorage.getItem("token"),
      "Content-Type": "application/json",
    };
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default instance;
