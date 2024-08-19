// base for making api calls
// API class object
import axios from "axios";

const apiContext = axios.create({
  baseURL: "http://localhost:8080/api/posts",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiContext;