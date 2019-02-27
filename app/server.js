const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const routes = require("./routes");

const app = express();

// Define port number
const port = 3000;

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Parse application/json
app.use(bodyParser.json());

// Enable cors
app.use(cors());

// Mount the routes
app.use(routes);

// Mount the server
app.listen(port, () => console.log(`App is listening on port ${port}`));
