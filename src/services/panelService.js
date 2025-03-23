import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const panelURL = API_URL + "/Panel";


export const getOnlines = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(panelURL + "/onlines", { headers: authHeader() })
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

export const getSearch = (by) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(panelURL + "/search?by=" + by, { headers: authHeader() })
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


export const banAccount = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(panelURL + "/ban", body, { headers: authHeader() })
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


export const unBanAccount = (userNum) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(panelURL + "/unban?userId=" + userNum, { headers: authHeader() })
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

export const getBanneds = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(panelURL + "/banneds", { headers: authHeader() })
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

export const getLogs = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(panelURL + "/logs", { headers: authHeader() })
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

export const getNews = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(panelURL + "/news", { headers: authHeader() })
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

export const mailGM = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(panelURL + "/mail", body, { headers: authHeader() })
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

export const sendItem = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(panelURL + "/sendItem", body, { headers: authHeader() })
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