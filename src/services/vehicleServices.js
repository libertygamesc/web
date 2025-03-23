import { SYSTEM_ERROR, URL_VEHICLES } from "../config/CONSTANTS";
import axios from 'axios'

export const getAllVehicles = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(URL_VEHICLES)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject("Error in getAllVehicles axios!");
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};

export const getVehicle = (uid) => {
  return new Promise((resolve, reject) => {
    try {
      getAllVehicles()
        .then((res) => {
          const vehicle = res.find(v => v.vehicle_uuid == uid);
          if (vehicle) {
            resolve(vehicle)
          } else {
            reject("Error in getVehicles axios!");
          }
        })
        .catch((err) => {
          reject("Error in getVehicles axios!");
        });
      return () => { };
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};