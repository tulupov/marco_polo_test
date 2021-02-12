import axios from "axios";
import { ACCESS_TOKEN_KEY } from './main';

export default axios.create({
  baseURL: "http://localhost:9090/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": "Bearer " + localStorage.getItem(ACCESS_TOKEN_KEY)
  }
});
