const express = require("express");
const paymentController = require("../controller/paymentController");
const routePayment = express.Router();

routePayment.post("/", paymentController.charge)
routePayment.get("/get", paymentController.getAll)
routePayment.post("/notifikasi", paymentController.notifikasi);


module.exports = routePayment