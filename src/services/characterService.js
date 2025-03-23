import { API_URL, SYSTEM_ERROR } from "../config/CONSTANTS";
import axios from 'axios'
import authHeader from "./authHeader";

const accountUrl = API_URL + "/Character";

export const getCharacters = () => {
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

export const updatePoints = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(accountUrl + "/points", body, { headers: authHeader() })
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


export const updateNation = (body) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .post(accountUrl + "/nation", body, { headers: authHeader() })
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

export const removePk = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/pk?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const Delete = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/delete?characterIdx=" + characterIdx, { headers: authHeader() })
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
export const MaxRune = (characterIdx, type) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/maxrune?characterIdx=" + characterIdx + "&type=" + type, { headers: authHeader() })
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




export const reward = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/reward?characterIdx=" + characterIdx, { headers: authHeader() })
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


export const getCostumeTitles = () => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/getCostumeTitles", { headers: authHeader() })
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

export const setCostumeTitle = (characterIdx, titleId) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/setCostumeTitle?characterIdx=" + characterIdx + "&titleId=" + titleId, { headers: authHeader() })
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

export const setTag = (characterIdx, tag) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/tag?characterIdx=" + characterIdx + "&tag=" + tag, { headers: authHeader() })
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




export const getTitles = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/titles?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const getTitle = (characterIdx, title) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/title?characterIdx=" + characterIdx + "&title=" + title, { headers: authHeader() })
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

export const getSkills = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/skills?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const getSkill = (characterIdx, itemId) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/skill?characterIdx=" + characterIdx + "&itemId=" + itemId, { headers: authHeader() })
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

export const getStyle = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/style?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const checkStyle = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/getStyle?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const getReset = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/reset?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const getFullReset = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/fullReset?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const removeStyle = (characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/removeStyle?characterIdx=" + characterIdx, { headers: authHeader() })
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

export const removeInfinite = (infinite, characterIdx, type) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/removeinfinite?infinite=" + infinite + "&characterIdx=" + characterIdx + "&type=" + type, { headers: authHeader() })
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

export const addInfinite = (infinite, characterIdx) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/addinfinite?infinite=" + infinite + "&characterIdx=" + characterIdx, { headers: authHeader() })
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

export const transferInfinite = (infinite, characterIdx, type, charName) => {
  return new Promise((resolve, reject) => {
    try {
      axios
        .get(accountUrl + "/transferinfinite?infinite=" + infinite + "&characterIdx=" + characterIdx + "&type=" + type + "&charName=" + charName, { headers: authHeader() })
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

function hexdec(dec) {
  return parseInt(dec, 16);
}

export function getClassSingle(classId) {

  var classSingle = {
    1: 'gu',
    2: 'du',
    3: 'ma',
    4: 'aa',
    5: 'ga',
    6: 'ea',
    7: 'gl',
    8: 'at',
    9: 'mn',
  };
  return classSingle[classId].toUpperCase();
}


export function decodificar(index, language) {

  if (language == 0 || language == null) {

    var classSingle = {
      1: 'gu',
      2: 'du',
      3: 'ma',
      4: 'aa',
      5: 'ga',
      6: 'ea',
      7: 'gl',
      8: 'at',
      9: 'mn',
    };

    var className = {
      1: 'Guerreiro',
      2: 'Duelista',
      3: 'Mago',
      4: 'Arqueiro Arcano',
      5: 'Guardião Arcano',
      6: 'Espadachim Arcano',
      7: 'Gladiador',
      8: 'Atirador Arcano',
      9: 'Mago Negro'
    };

    var classSingleResult = classSingle[index].toUpperCase();
    var classNameResult = className[index];

    return { index, classSingle: classSingleResult, className: classNameResult };

  }

}

