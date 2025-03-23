import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const accountUrl = API_URL + "/News";


export const getNews = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/get")
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.response.data);
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
}