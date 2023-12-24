const express = require("express");
const orderController = require("../controller/orderController");
const { checkRole } = require("../midddleware/authVerify");
const routeOrder = express.Router();

routeOrder.get("/", orderController.getAll);
routeOrder.get("/:id",  orderController.getById)
routeOrder.post("/create", (req, res, next) => checkRole(req, res, next, 1), orderController.create)

module.exports = routeOrder;
