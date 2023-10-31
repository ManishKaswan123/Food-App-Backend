const nodemailer = require("nodemailer");

const sendMail = async(str , data) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "manishkaswan88@gmail.com",
          pass: "xnnsfgcilvqarymq",
        },
      });
      
    var Osubject,Otext,Ohtml;

    if(str == "signup") {
        Osubject = `Thank You for signing ${data.name}`;
        Ohtml = `
        <h1>Welcome to FoodApp.com</h1>
        Hope you have a good time!
        Here are your details-
        Name:- ${data.name}
        Email:- ${data.email}
        `
    }
    else if(str == "resetpassword") {
        Osubject = `Reset Password`;
        Ohtml = `
        <h1> FoodApp.com</h1>
        Here is your link to reset your password
        ${data.resetPasswordLink}
        `
    }

    const info = await transporter.sendMail({
        from: '"FoodApp" <manishkaswan88@gmail.com>',
        to: data.email, 
        subject: Osubject,  
        html: Ohtml, 
    });
    
    console.log("Message sent: %s", info.messageId); 
    console.log(Osubject);     
};

module.exports = sendMail;
