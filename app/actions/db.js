const uuidv4 = require("uuid/v4");
const admin = require("firebase-admin");

//Import firebase service account key
const serviceAccount = require("../../keys/nifty-1ccc0-firebase-adminsdk-twswb-c7cfed819f.json");

// Initialize firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://nifty-1ccc0.firebaseio.com"
});

// Define db refs
const db = admin.database();
const userRef = db.ref("users");
const orderRef = db.ref("orders");

// Search user by phone number
const searchUserNum = param =>
  userRef
    .orderByChild("phoneNumber")
    .equalTo(param.phoneNumber)
    .once("value", snapshot => {
      return snapshot;
    });

// Create new user
const createUser = param => {
  return new Promise((resolve, reject) => {
    // Generate random uuid
    let publicKey = uuidv4();

    // Result object
    let result = { phoneNumber: param.phoneNumber, publicKey: publicKey };

    // Write user in firebase DB
    userRef
      .push({
        phoneNumber: param.phoneNumber,
        publicKey: publicKey
      })

      // Resolve promise
      .then(ref => {
        if (ref) {
          resolve(result);
        } else {
          reject("Error");
        }
      });
  });
};

// Update the public key
const updateKey = param => {
  let id = param.id;
  userRef.id.update({
    publicKey: param.publicKey
  });
};

// Create shipping order
const createOrder = param =>
  orderRef.push({
    status: 0,
    senderNum: "",
    recipientNum: "",
    dropoff: "",
    pickup: "",
    itemSize: ""
  });

// Export all functions
module.exports = { searchUserNum, createUser, updateKey, createOrder };
