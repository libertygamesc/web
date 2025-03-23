import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const missionsURL = API_URL + "/Mission";


export const getMissionDailys = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(missionsURL + "/dailys", { headers: authHeader() })
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

export const getMissionDaily = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(missionsURL + "/daily?id="+id, { headers: authHeader() })
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
