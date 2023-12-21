const express = require("express");
const routedUser = require("./user");
const routedRole = require("./role");
const routeItemDevice = require("./itemDevice");
const routeTechician = require("./technician");
const routeService = require("./service");
const routeOrder = require("./order");
const routedReview = require("./review");
const route = express.Router();

route.use("/role", routedRole);
route.use("/auth", routedUser);
route.use("/user", routedUser);
route.use("/item-device", routeItemDevice);
route.use("/technician", routeTechician);
route.use("/service", routeService);
route.use("/order", routeOrder);
route.use("/review", routedReview);

module.exports = route;
