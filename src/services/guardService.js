import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const guardUrl = API_URL + "/Guard";


export const getLanguage = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(guardUrl + "/GetLanguage", )
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