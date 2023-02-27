const express = require('express')
const router = express.Router()
const nodemailer = require('nodemailer')
require('dotenv').config()


router.get("/contact", (req, res)=>{
    res.render(('pages/contact'), { pageTitle: "Contact Us", message: req.flash("message") })
})

router.post("/contact", (req, res)=>{
    const output = `
    <p>${req.body.message}</p>
    <hr>
    <p>This message was sent by ${req.body.fullName}, mail attached ${req.body.email}</p>  
    `
    let transporter = nodemailer.createTransport({
        host: "mi3-ss26.a2hosting.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: process.env.userEmail,
          pass: process.env.userEmailPass, // generated password
        },
      })
    // setup email
    let mailOptions = {
        from: `${req.body.fullName}, ${req.body.email}>`, //sender
        to: process.env.userEmail,  //receivers emails
        cc: process.env.ccResEmail, //cc'd
        subject: `.:: SOS Nigeria, New Message from: ${req.body.fullName}`, //subject line
        text: 'Hello world?',
        html: output //html body
    }

    //send mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error)
        }
        console.log('Message send: %s', info.messageId)
        req.flash('message', 'Your message has been sent successfully!');
        res.redirect('/contact');
    })
})
  
module.exports = router