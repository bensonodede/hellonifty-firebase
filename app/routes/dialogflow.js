const app = (module.exports = require("express")());
const { fulfill } = require("../actions/dialogflow");

// Fulfillment webhook
//! On fulfillment:  write details to DB then update public key
app.post("/dialogflow", (req, res) => {
  let output = req.body.queryResult.outputContexts[0].parameters;
  res.status(200).send(output);
  fulfill(output)
  
  //
  .then(result => console.log(result));
});
