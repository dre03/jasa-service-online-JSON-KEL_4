const express = require("express");
const routedUser = require("./user");
const routedRole = require("./role");
const routeTechician = require("./technician");
const routeService = require("./service");
const routeOrder = require("./order");
const routedReview = require("./review");
const { authVerify, checkRole } = require("../midddleware/authVerify");
const route = express.Router();

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
route.use(
  "/service",
  (req, res, next) => authVerify(req, res, next),
  (req, res, next) => checkRole(req, res, next, 2),
  routeService
);
route.use("/order", (req, res, next) => authVerify(req, res, next), routeOrder);
route.use("/review", (req, res, next) => authVerify(req, res, next), routedReview);

module.exports = route;
