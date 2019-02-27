const uuidv5 = require("uuid/v5");
const { parsePhoneNumberFromString } = require("libphonenumber-js");

/********** Parse phone number ***********/

const parseNum = param => {
  return new Promise((resolve, reject) => {
    let parseNum = parsePhoneNumberFromString(param.number, "KE");
    let result = parseNum.nationalNumber;
    let error = "Invalid number";

    if (result.lenth === 9) {
      resolve(result);
    } else {
      reject(error);
    }
  });
};

/********** Generate session ID ***********/

const newSessionId = param => {
  return new Promise((resolve, reject) => {
    // A unique identifier for the given session
    let result = uuidv5(param.phoneNumber, param.publicKey);

    if (result) {
      resolve(result);
    } else {
      reject("Error generating namespace");
    }
  });
};

/********** Export all functions ***********/

module.exports = { newSessionId, parseNum };
