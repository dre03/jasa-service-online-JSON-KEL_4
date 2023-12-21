const express = require("express");
const technicianController = require("../controller/technicianController");
const routeTechician = express.Router();
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './assets/photoTechnician')
    },
    filename: (req, file, cb) => {
        const date = Date.now()
        cb(null, `${date}-${file.originalname}`)
    }
});
const upload = multer({ storage: storage });

routeTechician.get("/", technicianController.getAll)
routeTechician.get("/:id", technicianController.getById)
routeTechician.post("/create", upload.single("photo_technician"), technicianController.create)
routeTechician.put("/update/:id", upload.single("photo_technician"), technicianController.update)
routeTechician.delete("/delete/:id", technicianController.delete)



module.exports = routeTechician