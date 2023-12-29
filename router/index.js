const express = require("express");
const routedUser = require("./user");
const routedRole = require("./role");
const routeTechician = require("./technician");
const routeService = require("./service");
const routeOrder = require("./order");
const routedReview = require("./review");
const { authVerify, checkRole } = require("../midddleware/authVerify");
const routePayment = require("./payment");
const routePaymentHistory = require("./paymentHistory");
const paymentController = require("../controller/paymentController");
const route = express.Router();

route.post("/payment/notifikasi", paymentController.notifikasi);

route.use(
  "/role",
  (req, res, next) => authVerify(req, res, next),
  (req, res, next) => checkRole(req, res, next, 2),
  routedRole
);
route.use("/auth", routedUser);
route.use("/user", (req, res, next) => authVerify(req, res, next), routedUser);
route.use(
  "/technician",
  (req, res, next) => authVerify(req, res, next),
  (req, res, next) => checkRole(req, res, next, 2),
  routeTechician
);
route.use("/service",(req, res, next) => authVerify(req, res, next),routeService);
route.use("/order", (req, res, next) => authVerify(req, res, next), routeOrder);
route.use("/review", (req, res, next) => authVerify(req, res, next), routedReview);
route.use("/payment", (req, res, next) => authVerify(req, res, next), routePayment);
route.use("/payment-history", (req, res, next) => authVerify(req, res, next), routePaymentHistory);

module.exports = route;
