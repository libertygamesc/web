import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const accountUrl = API_URL + "/ShopBonus";


export const getCategories = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/categories", { headers: authHeader() })
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

export const getProducts = (categoryId) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/products?categoryId=" + categoryId, { headers: authHeader() })
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

export const buyProduct = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(accountUrl + "/buy", body, { headers: authHeader() })
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