const express = require("express");
const userRouter = express.Router();
const app = express();
const multer = require("multer");
const {signUp , isAuthorised , login , protectRoute , forgetpassword , resetpassword, logout} = require("../controller/authController");
const {getUser , updateUser , deleteUser , getAllUser , updateProfileImage} = require("../controller/userController");

// users options
userRouter
    .route("/:id")
    .patch(updateUser)
    .delete(deleteUser)

userRouter
    .route("/signUp")
    .post(signUp)

userRouter
    .route("/login")
    .post(login)

userRouter
    .route("/forgetpassword")
    .post(forgetpassword)

userRouter
    .route("/resetpassword/:token")
    .post(resetpassword)

userRouter
    .route('/logout')
    .get(logout)

// multer for fileupload
const multerStorage = multer.diskStorage({
    destination: function(req , file , cb){
        cb(null , "public/images")
    },
    filename:function(req , file , cb){
        cb(null , `user-${Date.now()}.jpeg`)
    }
});

const filter = function(req , file , cb) {
    if(file.mimetype.startsWith("image")){
        cb(null , true)
    }
    else {
        cb(new Error("Not an Image! Please Upload an image"), false)
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: filter
});

userRouter
    .post("/ProfileImage", upload.single('photo'),updateProfileImage);
    
userRouter
    .get("/ProfileImage" , (req , res) => {
    res.sendFile("/Users/manishkaswan/Desktop/Food App/Food-App/controller/multer.html")
});

// profile page
// userRouter
//     .use(protectRoute);

userRouter
    .route("/userProfile")
    .get(getUser)

// admin specific function
// userRouter
//     .use(isAuthorised(["admin"]));

userRouter
    .route("/getAllUser")
    .get(getAllUser)

    
module.exports = userRouter;