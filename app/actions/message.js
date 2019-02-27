const request = require("request");

const { newSessionId, parseNum } = require("../util");
const { readUser, updatePublicKey } = require("../actions/db");
const { sendRequest } = require("./dialogflow");

// Send message response
const sendResponse = param => {
  return new Promise(resolve => {
    // Chat API URL and token
    const url =
      "https://eu18.chat-api.com/instance22080/message?token=y73pggwn6n3ydwi7";

    // Body contains phone number and response
    const data = {
      phone: param.number,
      body: param.response
    };

    // Send POST request to chat API
    request({
      url: url,
      method: "POST",
      json: data
    });
    resolve("Done");
  });
};

// New message event
const newMessage = param => {
  console.log("NEW MESSAGE: ");
  console.log(param.body);

  // Parse string to integer
  if (parseInt(param.body)) {
    parseNum({ number: param.body })
      .then(result => console.log("PARSE RESULT: " + result))
      .catch(error => {
        console.log(error);
      });
  } else {
    console.log("NOT A NUMBER");
    res.send("New message function: Failed to parse string to integer");
  }

  // Generate session ID
  newSessionId(param)
    // Send request to dialogflow
    .then(result => {
      return sendRequest({ message: param.body, sessionId: result });
    })

    // Send dialogflow response back to user
    .then(result => {
      let number = param.number;
      sendResponse({ number: "+254" + number, response: result });
      console.log(result);
    });
};

/********** Send message to sender **********/

module.exports = { sendResponse, newMessage };
