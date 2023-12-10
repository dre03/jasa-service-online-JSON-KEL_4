const express = require("express");
const exampleController = require("../controller/exampleController");
const routedUser = require("./user");
const routedRole = require("./role");
const routeTechician = require("./technician");
const routeService = require("./service");


const route = express.Router()

route.get('/', exampleController.index)
route.use("/role", routedRole);
route.use("/auth", routedUser);
route.use("/user", routedUser);
route.use("/technician", routeTechician);
route.use("/service", routeService);

module.exports = route