const app = (module.exports = require("express")());
const { newSessionId, parseNum } = require("../util");
const { createUser, updatePublicKey, searchUserNum } = require("../actions/db");
const { sendResponse, newMessage } = require("../actions/message");

// Chat API webhook
app.post("/message", (req, res) => {
  let message = req.body.messages;

  // Check if message is array
  if (Array.isArray(message)) {
    message.forEach(element => {
      let { author, fromMe, body } = element;

      // Remove non-numerical characters from string
      let number = "+" + author.replace(/\D/g, "");

      // Check if message is from me
      if (fromMe) {
        res.status(200).send("Message sent from me");
      } else {
        let phoneNumber;

        // Parse phone number
        parseNum({ number: number })
          //Search for user by phone number
          .then(result => {
            phoneNumber = result;
            return searchUserNum({
              phoneNumber: phoneNumber
            });
          })

          // Resolve result
          .then(snapshot => {
            if (snapshot.val()) {
              return new Promise(resolve => {
                snapshot.forEach(data => {
                  let result = data.val();
                  resolve(result);
                });
              });
            } else {
              // Create user
              console.log("Number NOT found");
              return createUser({ phoneNumber: phoneNumber });
            }
          })

          // New message event
          .then(result => {
            // Add "body" element to "result" object
            result.body = body;
            newMessage(result);
            res.send(result);
          });
      }
    });
  } else {
    // Send error response
    res.send("Message is not an array.");
  }
});
