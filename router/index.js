const express = require("express");
const routedUser = require("./user");
const routedRole = require("./role");
const routeItemDevice = require("./itemDevice");

const route = express.Router()

route.use("/role", routedRole);
route.use("/auth", routedUser);
route.use("/user", routedUser);
route.use("/item-device", routeItemDevice);

module.exports = route