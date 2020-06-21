const express = require("express");
const route = express.Router();

// Intialize Routes
const registeruser = require("./api/RegistrationRoute");
const loginuser = require("./api/LoginRoute");
const brandroute = require("./api/BrandRoute");
const productroute = require("./api/ProductRoute");

// Intialize Route Use
route.use("/api/registeruser", registeruser);
route.use("/api/loginuser", loginuser);
route.use("/api/brand", brandroute);
route.use("/api/product", productroute);

// Export
module.exports = route;
