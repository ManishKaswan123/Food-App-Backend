const express = require('express');
const planRouter = express.Router();
const {protectRoute, isAuthorised} = require('../controller/authController');
const {getAllPlans , getPlan , createPlan , deletePlan , updatePlan , top3Plans} = require("../controller/planController");

// All plans 
planRouter
    .route("/topPlan")
    .get(top3Plans)   

planRouter
    .route("/allPlans")
    .get(getAllPlans)

// Own Plans (Logged In is necessary)
// planRouter
//     .use(protectRoute);

planRouter
    .route("/:id")
    .get(getPlan)
    

// Only Admin and Restaurantowner can create , change , delete plans
planRouter
    .use(isAuthorised(['admin' , 'restaurantowner']));

planRouter  
    .route("/crudPlan")
    .post(createPlan)
    
planRouter
    .route("/crudPlan/:id")
    .patch(updatePlan)
    .delete(deletePlan) 

module.exports = planRouter;