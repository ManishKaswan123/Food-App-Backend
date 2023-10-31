const { constants } = require("fs");
const planModel = require("../models/planModel");

// All Plans
const getAllPlans = async(req , res) => {
    try {
        let plans = await planModel.find();
        if(plans) {
            res.json ({
                message: "plans Retrieved",
                data: plans
            });
        }
      }
    catch(err) {
        res.json ({
            message: err.message
        });
    }
};

// Get Particular persons plan
const getPlan = async(req , res) => {
    try{
        let id = req.params.id;
        let plan = await planModel.findById(id);
        if(plan) {
            return res.json({
                message: "Plan get Successfully",
                data: plan
            });
        }
        else {
            return res.json({
                message: "Unvaild User or logged In first"
            });
        }
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
};

// Create New Plan
const createPlan = async(req , res) => {
    try {
        const planData = req.body;
        const plan = await planModel.create(planData);
        if(plan) {
            res.json({
                message: "Plan is created Successfully",
                data: plan
            });
        }
        else {
            res.json({
                message: "Error while creating plan"
            });
        }
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
};

// Delete Plan
const deletePlan = async(req , res) => {
    try {
        let id = req.params.id;
        let plan = await planModel.findByIdAndDelete(id);
        if(plan) {
            res.json({
                message: "Plan is Deleted Successfully",
                data: plan
            });
        }
        else {
            return res.json({
                message: "Plan not Found"
            });
        }
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

// Update Plan
const updatePlan = async(req , res) => {
    try {
        let id = req.params.id;
        let dataToBeUpdated = req.body;
        let plan = await planModel.findById(id);
        if(plan) {
            const keys = [];
            for(let key in dataToBeUpdated) {
                keys.push(key);
            }
            for(let i = 0; i < keys.length; i++) {
                plan[keys[i]] = dataToBeUpdated[keys[i]];
            }
            await plan.save();
            res.json({
                message: "Plan updated Successfully",
                data: plan
            });
        }
        else {
            res.json({
                message: "Plan Not Found"
            });
        }
    }
    catch(err) {
        res.json({
            message: "New Error"
        });
    }
}

// Get Top 3 Plans
const top3Plans = async(req , res) => {
    try {
        const plans = await planModel.find().sort({
            ratingsAverage: -1
        }).limit(3);
        
        if(plans) {
            res.json({
                message: "Top 3 plans",
                data: plans
            });
        }
        else {
            res.json({
                message: "No plan Available"
            });
        }
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

module.exports = {getAllPlans , getPlan , createPlan , deletePlan , updatePlan , top3Plans};