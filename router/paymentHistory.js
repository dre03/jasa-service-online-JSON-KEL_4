const express = require("express");
const paymentHistoryController = require("../controller/paymentHistoryController");
const routePaymentHistory = express.Router();

routePaymentHistory.get("/", paymentHistoryController.getAll)


module.exports = routePaymentHistory