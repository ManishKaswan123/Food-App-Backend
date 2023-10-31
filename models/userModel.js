const mongoose = require("mongoose");
const emailValidator = require("email-validator");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: function() {
            return emailValidator.validate(this.email);
        }
    },
    password: {
        type: String,
        required: true,
        minLenght: 8
    },
    confirmPassword: {
        type: String,
        required: true,
        minLenght: 8,
        validate: function() {
            return this.confirmPassword == this.password;
        }
    },
    role: {
        type: String,
        enum: ["admin" , "user" , "restaurantowner" , "deliveryboy"],
        default: "user"
    },
    profileImage: {
        type: String,
        default: "img/users/default.jpeg"
    },
    resetToken: String
});

function generateRandomString(length) {
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    randomString += characterSet[randomIndex];
    }

    return randomString;
};

userSchema.methods.createResetToken = () => {
    // const resetToken = crypto.randomBytes(32).toString("hex");
    const resetToken = generateRandomString(32);
    this.resetToken = resetToken;
    return resetToken;
}

userSchema.methods.resetPasswordHandler = (password , confirmPassword) => {
    this.password = password;
    this.confirmPassword = confirmPassword;
    this.resetToken = undefined;
}

// userSchema.pre('save' , () => {
//     this.confirmPassword = undefined;
// });

// userSchema.pre('save' ,async () => {
//     let salt = await bcrypt.genSalt();
//     let hashedString = await bcrypt.hash(this.password , salt);
//     console.log(hashedString);
// });

const userModel = mongoose.model('userModel' , userSchema);

module.exports = userModel;