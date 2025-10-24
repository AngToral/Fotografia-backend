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
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    logger: true,
    debug: true,
    tls: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    }
    // tls: {
    //     rejectUnauthorized: false
    // }
});

// Antes de enviar, valida la conexión y autenticación
transporter.verify((err, ok) => {
    if (err) {
        console.error('SMTP verify error:', err);
    } else {
        console.log('SMTP server is ready:', ok);
    }
});

module.exports = transporter;