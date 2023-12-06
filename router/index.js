const express = require("express");
const exampleController = require("../controller/exampleController");
const routeTechician = require("./technician");
const route = express.Router()

route.get('/', exampleController.index)
route.use("/technician", routeTechician)

module.exports = route