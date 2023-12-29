const express = require("express");
const serviceController = require("../controller/serviceController");
const { checkRole } = require("../midddleware/authVerify");
const routeService = express.Router();

routeService.get("/", serviceController.getAll);
routeService.get("/:id", serviceController.getById);
routeService.post("/create",  (req, res, next) => checkRole(req, res, next, 2), serviceController.create);
routeService.put("/update/:id",  (req, res, next) => checkRole(req, res, next, 2), serviceController.update);
routeService.delete("/delete/:id",  (req, res, next) => checkRole(req, res, next, 2), serviceController.delete);


module.exports = routeService