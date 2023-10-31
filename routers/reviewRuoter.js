const express = require('express');
const reviewRouter = express.Router();
const { protectRoute } = require("../controller/authController");
const {allReviews , top3Reviews , getPlanReview , createReview , updateReivew , deleteReview} = require("../controller/reviewController");

reviewRouter
    .route("/allReviews")
    .get(allReviews)

reviewRouter
    .route("/top3Reviews")
    .get(top3Reviews)

reviewRouter
    .route("/:id")
    .get(getPlanReview)

// reviewRouter
//     .use(protectRoute)

reviewRouter
    .route("/crud/:plan")
    .post(createReview)
    .patch(updateReivew)
    .delete(deleteReview)

reviewRouter
    .route("/allReview")
    .get(allReviews);

module.exports = reviewRouter;