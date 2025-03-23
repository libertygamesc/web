import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const accountUrl = API_URL + "/Account";

export const getAccount = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/get", { headers: authHeader() })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
        });
    } catch (error) {
      reject(SYSTEM_ERROR);
    }
  });
};

export const getPasses = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/passes", { headers: authHeader() })
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

export const getMyCode = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/myCode", { headers: authHeader() })
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


export const getCheckDaily = (hardwareId, ip) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/daily/check?hardwareId=" + hardwareId + "&ip=" + ip, { headers: authHeader() })
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

export const getDaily = (hardwareId, ip) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/daily?hardwareId=" + hardwareId + "&ip=" + ip, { headers: authHeader() })
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

export const getIp = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get("https://api.ipify.org/?format=json")
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

export const getPass = (pass, level) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/pass?pass=" + pass + "&level=" + level, { headers: authHeader() })
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

export const getFullPass = (pass) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/pass/complete?pass=" + pass, { headers: authHeader() })
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

export const BuyPremiumPass = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/pass/buypremium", { headers: authHeader() })
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




