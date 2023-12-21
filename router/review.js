const express = require("express");
const reviewController = require("../controller/reviewController");
const routedReview= express.Router();

routedReview.post("/create", reviewController.create);
routedReview.get("/", reviewController.getAll);
routedReview.get("/:id", reviewController.getById)


module.exports = routedReview;