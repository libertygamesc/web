import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'

const accountUrl = API_URL + "/Account";

export const createAccount = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(accountUrl + "/register", body)
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

export const loginAccount = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(accountUrl + "/login", body)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.data));
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

export const verifyAccount = (key) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/verify?key=" + key)
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

export const newPassword = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/newpassword?id=" + id)
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

export const changePassword = (key, password) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/changepassword?key=" + key + "&password=" + password)
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

export const getLocalUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    const expiration = new Date(user.expiration);
    const now = new Date();
    if (now < expiration) {
      return user;
    } else {
      return null;
    }
  }
  return null;
}

