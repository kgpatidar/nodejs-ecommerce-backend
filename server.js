const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());

// Body Parsing
app.use(bodyParser.urlencoded({ extended: false, useUnifiedTopology: true }));
app.use(bodyParser.json());

// Accessing Public Folder
app.use(express.static("public"));

// MongoDB Connection
connectDB();

// Routing
const route = require("./server/routes/index");
app.use(route);

// Porting Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server Started at " + PORT));
