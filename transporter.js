const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    //service: "Gmail",
    host: "smtp.gmail.com",
    //port: 465,
    port: 587,
    //secure: true,
    secure: false,
    auth: {
        user: process.env.GOOGLEUSER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
    logger: true,
    debug: true,
    tls: {
        minVersion: 'TLSv1.2'
    }
    // tls: {
    //     rejectUnauthorized: false
    // }
});

module.exports = transporter;