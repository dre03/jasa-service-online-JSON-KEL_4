const express = require("express");
const userController = require("../controller/userController");
const routedUser = express.Router();
const multer = require("multer");
const { checkRole } = require("../midddleware/authVerify");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./assets/photoUsers");
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    cb(null, `${date}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

routedUser.post("/login", userController.login);
routedUser.post("/register", upload.single("photo"), userController.register);
routedUser.get("/", (req, res, next) => checkRole(req, res, next, 2), userController.getAll);
routedUser.put("/update/", (req, res, next) => checkRole(req, res, next, 1), upload.single("photo"), userController.update);
routedUser.delete("/delete", (req, res, next) => checkRole(req, res, next, 1), userController.delete);
module.exports = routedUser;
