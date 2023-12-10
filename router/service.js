const express = require("express");
const serviceController = require("../controller/serviceController");
const routeService = express.Router();

routeService.get("/", serviceController.getAll);
routeService.get("/:id", serviceController.getById);
routeService.post("/create", serviceController.create);
routeService.put("/update/:id", serviceController.update);
routeService.delete("/delete/:id", serviceController.delete);


module.exports = routeService