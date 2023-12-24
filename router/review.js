const express = require("express");
const reviewController = require("../controller/reviewController");
const { checkRole } = require("../midddleware/authVerify");
const routedReview= express.Router();

routedReview.post("/create", (req, res, next) => checkRole(req, res, next, 1), reviewController.create);
routedReview.get("/", reviewController.getAll);
routedReview.get("/:id", reviewController.getById)


module.exports = routedReview;