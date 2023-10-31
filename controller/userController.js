const userModel = require("../models/userModel");

const getUser = async (req , res) => {
    let id = req.id;
    console.log(id);
    let user = await userModel.findById(id);
    console.log(user);
    if(user) {
        return res.json(user);
    }
    else {
        return res.json({
            message: "User Not Found"
        });
    }
};

// const postUser = async (req , res) => {
//     let users = await userModel.create(req.body);
//     await users.save();
//     console.log(users);
//     res.json({
//         message: "Data received successfully",
//         user: users
//     });
// };

const updateUser = async (req , res) => {
    // console.log("req.body:- " , req.body);
    try {
        let id = req.params.id;
        let user = await userModel.findById(id);
        let dataToBeUpdated = req.body;
        if(user) {
            const keys = [];
            for(let key in dataToBeUpdated) {
                keys.push(key);
            }

            for(let i = 0; i < keys.length; i++) {
                user[keys[i]] = dataToBeUpdated[keys[i]];
            }

            const updatedData = await user.save();
            res.json({
                message: "Data Updated",
                data: user
            });
        }
        else {
            return res.json({
                message: "User Not Found"
            });
        }
    }
    catch(err){
        return res.json({
            message: err.message
        });
    };
    
};

const deleteUser = async (req , res) => {
    try {
        let id = req.params.id;
        let user = await userModel.findByIdAndDelete(id);
        if(user) {
            res.json({
                message: "Data has been Deleted",
                data: user
            });
        }
        else {
            return res.json ({
                message: "User Not Found"
            });
        }
    }
    catch(err) {
        return res.json ({
            message: err.message
        });
    }
};

const getAllUser = async (req , res) => {
    try {
        let users = await userModel.find();
        if(users) {
            res.json ({
                message: "Users Retrieved",
                data: users
            });
        }
    }
    catch(err) {
        res.json ({
            message: err.message
        });
    }
};

// const setCookies = (req , res) => {
//     res.cookie('isLoggedIn' , true ,
//     {
//         maxAge: 1000*60*60*24, secure: true, httpOnly: true
//     });
//     res.cookie('isPrimeMember' , true);
//     res.send('Cookies has been set');
// }

// const getCookies = (req , res) => {
//     let cookies = req.cookies.isLoggedIn;
//     console.log(cookies);
//     res.send("Cookies Received");
// }

const updateProfileImage = (req , res) => {
    res.json({
        message: "File received successfully"
    });
};

module.exports = {getUser , updateUser , deleteUser , getAllUser , updateProfileImage};