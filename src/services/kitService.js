import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const accountUrl = API_URL + "/Kit";


export const getKit = (classType) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/get?classType=" + classType, { headers: authHeader() })
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