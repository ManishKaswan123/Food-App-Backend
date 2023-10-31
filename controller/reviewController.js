const planModel = require("../models/planModel");
const reviewModel = require("../models/reviewModel");


// Get All Reviews
const allReviews = async(req , res) => {
    try {
        let reviews = await reviewModel.find();
        if(reviews) {
            res.json({
                message: "Review retrieved",
                data: reviews
            });
        }
        else {
            res.json({
                message: "There are no reviews"
            });
        }
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

// Top 3 Reviews 
const top3Reviews = async(req , res) => {
    try {
        const reviews = await reviewModel.find().sort({
            rating: -1
        }).limit(3);

        if(reviews) {
            res.json({
                message: "Review retrieved",
                data: reviews
            });
        }
        else {
            res.json({
                message: "Review Not Found"
            });
        }
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

// Get Plan Review
const getPlanReview = async(req , res) => {
    try {
        let planId = req.params.id;
        let reviews = await reviewModel.find();
        reviews = reviews.filter(review => review.plan._id == planId);

        if(reviews) {
            res.json({
                message: "Review retrieved",
                data: reviews
            });
        }
        else {
            res.json({
                message: "Review Not Found"
            });
        }
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

// Create Review
const createReview = async(req , res) => {
    try {
        const id = req.params.plan;
        const reviewData = req.body;
        const plan = await planModel.findById(id);

        if(plan) {
            let count = plan.numberOfReviews;
            let lastRating = plan.ratingsAverage;

            lastRating = (lastRating*count+reviewData.rating)/(count+1);

            plan.numberOfReviews = count+1;
            plan.ratingsAverage = lastRating;

            await plan.save();

            const review = await reviewModel.create(reviewData);
            if(review) {
                res.json({
                    message: "Review Created Successfully",
                    data: review
                });
            }
            else {
                res.json({
                    message: "Error while creating review"
                });
            }
            
        }
        else {
            res.json({
                message: "Invalid Plan"
            });
        }
        
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
}

// Udate Review
const updateReivew = async(req , res) => {
    try{
        let planId = req.params.id;
        let id = req.body.id;
        let dataToBeUpdated = req.body;

        let review = await reviewModel.findById(id);
        if(review) {
            const keys = [];
            for(let key in dataToBeUpdated) {
                if(key == 'id')
                    continue;
                keys.push(key);
            }
            for(let i = 0; i < keys.length; i++) {
                review[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await review.save();
            res.json({
                message: "Review updated Successfully",
                data: review
            });
        }
        else {
            res.json({
                message: "Review Not Found"
            });
        }
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
}

// Delete Review
const deleteReview = async(req , res) => {
    try {
        let planId = req.params.id;
        let id = req.body.id;
        let review = await reviewModel.findByIdAndDelete(id);
        return res.json({
            message: "Review Deleted Successfully",
            data: review
        });
    }
    catch(err) {
        return res.json({
            message: err
        });
    }
}
module.exports = {allReviews , top3Reviews , getPlanReview , createReview , updateReivew , deleteReview};