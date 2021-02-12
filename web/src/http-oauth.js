import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3000/oauth",
  headers: {
    "Content-type": "application/x-www-form-urlencoded"
  }
});
