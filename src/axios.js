import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000/api/",
  timeout: 1000,
  headers: {
    "x-token": localStorage.getItem("token"),
    "Content-Type": "application/json",
  },
});

export default instance;
