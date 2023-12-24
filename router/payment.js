const express = require("express");
const paymentController = require("../controller/paymentController");
const { checkRole } = require("../midddleware/authVerify");
const routePayment = express.Router();

routePayment.post("/", (req, res, next) => checkRole(req, res, next, 1), paymentController.charge)
routePayment.post("/notifikasi",(req, res, next) => checkRole(req, res, next, 2), paymentController.notifikasi);


module.exports = routePayment