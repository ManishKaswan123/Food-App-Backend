const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {JWT_KEY} = require("../secrets");
const sendMail = require("../routers/utility/nodemailer");

// Sign Up user
const signUp = async (req , res) => {
    try {
        let dataObj = req.body;
        let user = await userModel.create(dataObj);
        sendMail("signup", user);
        if(user) {
            res.json({
                message: "User signed Up",
                data: user
            });
        }
        else {
            res.json ({
                message: "Error while Signing Up"
            });
        }
        
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

// const middleware1 = (req , res) => {
//     console.log("Middlware1 Encountered");
//     res.json({
//         message: "Middleware1",
//         data: req.body
//     });
// };

// const middleware2 = (req , res) => {
//     console.log("Middleware2 Encountered");
//     console.log("Middleware2 ended req/res cycle");
//     res.json({
//         message: "Middleware2",
//         data: req.body
//     });
// };

// const getSignUp = (req , res , next) => {
//     console.log("GetSignUp Called");
//     next();
// };

// const postSignUp = async (req , res) => {
//     let dataObj = req.body;
//     let user = await userModel.create(dataObj);
//     res.json({
//         message: "User SignUp successfully",
//         data: dataObj
//     });
// };

// User Login
const login = async (req , res) => {
    try {
        let data = req.body;
        if(data.email && data.password) {
            let user = await userModel.findOne({email: data.email});
            if(user) {
                if(user.password === data.password) {
                    let uid = user["_id"];
                    let token = jwt.sign({payload: uid},JWT_KEY);
                    res.cookie('login' , token , {httpOnly: true});

                    return res.json({
                        message: "User has logged in",
                        userDetails: data
                    });
                }
                else {
                    return res.json({
                        message: "Wrong Password"
                    });
                }
            }
            else {
                return res.json({
                    message: "Email Not Found"
                });
            }
        }
        else {
            return res.json({
                message: "Input is Empty"
            });
        }
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
};

// IsAuthorised -> To check the user Role
const isAuthorised = (roles) => {
    return((req , res , next) => {
        if(roles.includes(req.role) === true) {
            next();
        }
        else {
            res.status(401).json ({
                message: "You are not allowed to access"
            });
        }
    });
}

// Protect Route
const protectRoute = async (req , res , next) => {
    try {
        let token;
        if(req.cookies.login) {
            token = req.cookies.login;
            let payload = jwt.verify(token , JWT_KEY);

            if(payload) {
                const user = await userModel.findById(payload.payload);
                req.role = user.role;
                req.id = user.id;
                console.log(req.role , req.id);
                next();
            }
            else {
                res.json({
                    message: "User is not verified"
                });
            }
        }
        else {
            const client = req.get('User-Agent');
            if(client.includes('Mozilla') == true)
                return res.redirect('/login');

            return res.json({
                message: "Please Login"
            });
        }
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
};

// ForgetPassword
const forgetpassword = async(req , res) => {
    let {email} = req.body;
    try {
        const user = await userModel.find({email:email});
        if(user) {
            const resetToken = user.createResetToken();
            let resetPasswordLink = `${req.protocol}://${req.get('host')}/resetpassword/${resetToken}`;
            let obj = {
                resetPasswordLink:resetPasswordLink,
                email:email
            }
            sendMail("resetpassword", obj);
        }
        else {
            return res.json({
                message: "Please SignUp"
            });
        }
    }
    catch(err) {
        return res.json({
            message: err.message
        });
    }
};

// ResetPassword
const resetpassword = async(req , res) => {
    try {
        const token = req.parms.token;
        let {password , confirmpassword} = req.body;
        const user = await userModel.findOne({resetToken:token});
        if(user) {
            user.resetPasswordHandler(password , confirmpassword);
            await user.save();
            res.json({
                message: "Password Changed successfully"
            });
        }
        else {
            res.json({
                message: "User Not Found"
            });
        }
    }
    catch(err) {
        res.json({
            message: err.message
        });
    }
};

// LogOut 
const logout = (req , res) => {
    res.cookie('login' , ' ', {maxAge:1});
    res.json({
        message: "User logged lout successfully"
    });
};

module.exports = {signUp , isAuthorised , login , protectRoute , forgetpassword , resetpassword , logout};