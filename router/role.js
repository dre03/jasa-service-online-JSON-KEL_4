const express = require("express");
const roleController = require("../controller/roleController");
const routedRole = express.Router();

routedRole.post("/create", roleController.create);
routedRole.get("/index", roleController.getAll);
routedRole.get("/index/:id", roleController.gettById);
routedRole.put("/update/:id", roleController.update);
routedRole.delete("/delete/:id", roleController.delete);

module.exports = routedRole;
