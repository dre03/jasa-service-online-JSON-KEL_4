const express = require("express");
const exampleController = require("../controller/exampleController");
const route = express.Router()

route.get('/',exampleController.index)

module.exports = route