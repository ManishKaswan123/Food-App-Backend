const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    review: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 10,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'userModel',
        required: [true , 'Review must belong to a user']
    },
    plan: {
        type: mongoose.Schema.ObjectId,
        ref: 'planModel',
        required: [true , "Review must belong to a plan"]
    }
});

// Mongoose Hook
reviewSchema.pre(/^find/, function (next) {
    this.populate({
        path: "user",
        select: "name profileImage"
    }).populate("plan");
    next();
});


const reviewModel = mongoose.model('reviewModel' , reviewSchema);

// async function createReview(){
//     let reviewObj = {
//         review: "Best food ever",
//         rating:9,
//         user: "64ec340b42bf5dc34159b586",
//         plan: "651911778c5ee6eee25733e0"

//     }
//     const doc = await reviewModel.create(reviewObj);
//     console.log(doc);
// };
// createReview();

module.exports = reviewModel;