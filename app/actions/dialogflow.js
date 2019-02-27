const dialogflow = require("dialogflow");

/********** Send request to dialogflow **********/

const sendRequest = param => {
  return new Promise((resolve, reject) => {
    //GCP project ID with dialogflow API enabled
    const projectId = "nifty-1ccc0";

    // Create dialogflow session
    const sessionClient = new dialogflow.SessionsClient();
    const sessionPath = sessionClient.sessionPath(projectId, param.sessionId);

    // The text query request.
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          // The query to send to the dialogflow agent
          text: param.message,

          // The language used by the client (en-US)
          languageCode: "en-US"
        }
      }
    };

    // Send request
    sessionClient.detectIntent(request).then(response => {
      let result;

      // Assign response
      result = response[0].queryResult.fulfillmentText;

      if (result) {
        // Use regex to create line breaks
        result = result.replace(/\\n/g, "\n");

        // Resolve promise
        resolve(result);
      } else {
        // Reject promise
        reject("Dialogflow error");
      }
    });
  });
};

/********** Fulfillment event ***********/

const fulfill = param => {
  return new Promise(resolve => {
    let phoneNumber = param[`phone-number`][0];
    let itemSize = param[`item-size`];
    console.log(phoneNumber);
    console.log(itemSize);
    resolve({ itemSize: itemSize, recipientNum: phoneNumber });
  });
};

/********** Export all functions ***********/
module.exports = { sendRequest, fulfill };
