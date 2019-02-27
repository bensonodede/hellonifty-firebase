const app = (module.exports = require("express")());

// Import routes
let message = require("./message");
let dialogflow = require("./dialogflow");

// Use routes in express router
app.use(message);
app.use(dialogflow);
