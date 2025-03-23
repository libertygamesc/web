import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const cashUrl = API_URL + "/Cash";

export const getCash = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/get", { headers: authHeader() })
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

export const getDonates = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/donates", { headers: authHeader() })
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

export const getKitDonates = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/kitdonates", { headers: authHeader() })
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


export const requestDonate = (data) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(cashUrl + "/donate", data, { headers: authHeader() })
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

export const confirmDonateRequest = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/confirm?donateID=" + id, { headers: authHeader() })
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

export const deleteDonate = (id) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/delete?donateID=" + id, { headers: authHeader() })
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

export const buySpin = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/buySpin", { headers: authHeader() })
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
};

export const getSpin = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/spin", { headers: authHeader() })
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

export const verifyCupom = (userNum, key) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/cupom?userNum=" + userNum + "&code=" + key)
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

export const getLotterys = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/lotterys", { headers: authHeader() })
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

export const getLotterysCupons = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/lotteryCupons", { headers: authHeader() })
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

export const getLotteryCupom = (lotteryId) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(cashUrl + "/lotteryCupom?lotteryId=" + lotteryId, { headers: authHeader() })
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


