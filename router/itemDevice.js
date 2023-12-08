const express = require("express");
const routeItemDevice = express.Router();
const multer = require("multer");
const itemDeviceController = require("../controller/itemDeviceController");

const storge = multer.diskStorage({
    destination: function(req, res, cb){
        cb(null, "./assets/photoItemDevices")
    },
    filename: function(req, file, cb){
        const date = Date.now();
        cb(null, `${date}-${file.originalname}`)
    }
})

const upload = multer({storage: storge});

routeItemDevice.post("/create", upload.single("photo_device"), itemDeviceController.create);
routeItemDevice.put("/update/:id", upload.single("photo_device"), itemDeviceController.update);
routeItemDevice.get("/index", itemDeviceController.getAll);
routeItemDevice.get("/index/:id", itemDeviceController.getById);
routeItemDevice.delete("/delete/:id", itemDeviceController.delete);

module.exports = routeItemDevice;