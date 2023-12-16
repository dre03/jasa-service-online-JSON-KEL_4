const express = require("express");
const orderController = require("../controller/orderController");
const order = require("../models/order");
const routeOrder = express.Router();

routeOrder.get("/", orderController.getAll);
routeOrder.get("/:id", orderController.getById)
routeOrder.post("/create", orderController.create)

module.exports = routeOrder;
