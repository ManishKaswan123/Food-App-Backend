const express = require("express");
const bookingRouter = express.Router();
const { protectRoute } = require("../controller/authController");
const createSession = require("../controller/bookingController");
const path = require('path');


bookingRouter
    .post('/createSession', protectRoute , createSession)

bookingRouter
    .get('/createSession' , (req , res) => {
        res.sendFile(path.join(__dirname, 'booking.html'));

    })

module.exports = bookingRouter;