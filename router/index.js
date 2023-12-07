const express = require("express");
const exampleController = require("../controller/exampleController");
const routedUser = require("./user");
const routedRole = require("./role");

const route = express.Router()

route.get('/',exampleController.index)
route.use("/role", routedRole);
route.use("/auth", routedUser);
route.use("/user", routedUser);

module.exports = route