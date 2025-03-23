import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'

const accountUrl = API_URL + "/Ranking";


export const getHome = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/home")
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

export const getDungeons = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/dungeon")
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

export const getAll = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/all")
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

export const getPoints = (classId, nation) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/points?style=" + classId + "&nation=" + nation)
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

export const getResets = (classId, nation) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/resets?style=" + classId + "&nation=" + nation)
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

export const getBaldus = (classId, nation) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/baldus?style=" + classId + "&nation=" + nation)
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

export const getPowerCombat = (classId, nation) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/PowerCombat?style=" + classId + "&nation=" + nation)
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

export const getInfiniteChar = (name) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/infiniteChar?name="+name)
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
export const getInfinites =(classId, nation, size) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/infinite?style=" + classId + "&nation=" + nation + "&size=" + size)
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

export const getInfiniteLogs =() => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/InfiniteHistory")
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