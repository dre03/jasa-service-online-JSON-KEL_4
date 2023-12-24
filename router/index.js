const express = require("express");
const routedUser = require("./user");
const routedRole = require("./role");
const routeTechician = require("./technician");
const routeService = require("./service");
const routeOrder = require("./order");
const routedReview = require("./review");
const routePayment = require("./payment");
const routePaymentHistory = require("./paymentHistory");
const route = express.Router();

route.use("/role", routedRole);
route.use("/auth", routedUser);
route.use("/user", routedUser);
route.use("/technician", routeTechician);
route.use("/service", routeService);
route.use("/order", routeOrder);
route.use("/review", routedReview);
route.use("/payment", routePayment)
route.use("/payment-history", routePaymentHistory);

module.exports = route;
