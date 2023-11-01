// const dotenv = require('dotenv');
// dotenv.config({ path: "./config.env"});

const express = require('express');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const app = express();

const DATABASE = process.env.DATABASE;
const BASE_URL = process.env.BASE_URL;
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: `${BASE_URL}`,  
  credentials: true,  
}));

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || BASE_URL.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// }));

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

mongoose.connect(DATABASE)
.then(() => {
    console.log("DB is connected");
})
.catch((err) => {
    console.log(err);
});

app.use(express.json());
app.use(cookieParser());

const userRouter = require("./routers/userRouter.js");
const planRouter = require("./routers/planRouter.js");
const reviewRouter = require("./routers/reviewRuoter.js");
const bookingRouter = require("./routers/bookingRouter.js");


app.use("/user" , userRouter); 
app.use("/plan" , planRouter);
app.use("/review" , reviewRouter);
app.use("/booking" , bookingRouter);

module.exports = app;