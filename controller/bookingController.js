const SK = "sk_test_51Nz1BtSEe1Zu4VEd9l9DDhFtSgQs13cDioskl2izg2qmxuyI5dI4VWqCUvEmzImkzBNh5VAmMxYm2RebXedpXp1o00F6lLoP5S";
const stripe = require('stripe')(SK);
const planModel = require("../models/planModel");
const userModel = require("../models/userModel");

const createSession = async (req , res) => {
    try {
        let userId = req.id;  
        let planId = req.params.id;

        const user = await userModel.findById(userId);
        const plan = await planModel.findById(planId);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            customer_email: user.email,
            client_reference_id: plan.id,
            line_items: [
                {
                    name: plan.name,
                    description: plan.description,
                    amount: plan.price,
                    currency: "inr",
                    quantity: 1
                }
            ],
            success_url: `${req.protocol}://${req.get("host")}/profile`,
            cancel_url: `${req.protocol}://${req.get("host")}/profile`
        })
        res.status(200).json({
            status: "Success",
            session
        });
    }
    catch(err) {
        res.json({
            err: err.message
        });
    }
}

module.exports = createSession;