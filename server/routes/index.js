const express = require("express");
const route = express.Router();

// Intialize Routes
const registeruser = require("./api/RegistrationRoute");
const loginuser = require("./api/LoginRoute");
const brandroute = require("./api/BrandRoute");
const productroute = require("./api/ProductRoute");
const cartroute = require("./api/CartRoute");

// Intialize Route Use
route.use("/api/registeruser", registeruser);
route.use("/api/loginuser", loginuser);
route.use("/api/brand", brandroute);
route.use("/api/product", productroute);
route.use("/api/cart/", cartroute);

// Export
module.exports = route;
