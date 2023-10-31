const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        maxlength: [20 , 'Plan Name Should not exceeds 20 characters']
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: [true , 'Price Not entered']
    },
    ratingsAverage: {
        type: Number,
    },
    numberOfReviews: {
        type: Number,
        default: 0
    },
    discount: {
        type: Number,
        // validate: [function() {
        //     return this.discount < 100;
        // } , "Discount should not exceeds price"]
    }
});

const planModel = mongoose.model('planModel' , planSchema);

// async function createPlane(){
//     let planObj = {
//         name: "SuperFood123",
//         duration:60,
//         price:1500,
//         ratingsAverage:4,
//         discount:20
//     }
//     const doc = await planModel.create(planObj);
//     // await doc.save();
//     console.log(doc);
// };
// createPlane();

module.exports = planModel;