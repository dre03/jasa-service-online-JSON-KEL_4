const express = require("express");
const userController = require("../controller/userController");
const routedUser = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "./assets/photoUser");
  },
  filename: function (req, file, cb) {
    const date = Date.now();
    cb(null, `${date}-${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

routedUser.post("/login", userController.login);
routedUser.post("/register", upload.single("photo"), userController.register);
routedUser.get("/index", userController.getAll);
module.exports = routedUser;
