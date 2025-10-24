const { userModel } = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { brevo, SendSmtpEmail } = require('../brevo');
const forgotEmail = require("../emails/forgotEmail");
const contactEmail = require("../emails/contactEmail");
const changePassword = require("../emails/changePassword");
const changeEmail = require("../emails/changeEmail");

const myTokenSecret = process.env.MYTOKENSECRET //creo secreto de firma para token

const getUser = async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id)
        if (user) { return res.status(200).json(user) }
        else return res.status(404).json({ msg: "User not found" })
    } catch (error) {
        res.status(500).json({ msg: "Error getting users", error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10) //si cambio contraseña, la encripto
            const data = await userModel.findByIdAndUpdate(req.params.id, { ...req.body, password: hashedPassword })
            res.status(200).json(data)
        } else {
            const user = await userModel.findByIdAndUpdate(req.params.id, { ...req.body })
            if (user) { return res.status(200).json(user) }
            else return res.status(404).json({ msg: "User not found" })
        }
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const addUser = async (req, res) => {
    const { email } = req.body
    try {
        const userChecked = await userModel.findOne({ email: email }) //busco email en BD
        if (userChecked) {
            res.status(500).json({ msg: "This email already exist" })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10) //encripto contraseña
        const user = await userModel.create({ ...req.body, password: hashedPassword }) //creo usuario con contraseña encriptada
        if (user) { return res.status(201).json(user) }
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const userChecked = await userModel.findOne({ email: email }) //busco email en BD
        if (!userChecked) return res.status(404).json({ msg: "This email is not registered" })
        if (userChecked.removedAt) return res.status(404).json({ msg: "Email is no longer active" })
        const passwordChecked = await bcrypt.compare(req.body.password, userChecked.password) // si existe email, verificamos si la contraseña es correcta
        if (passwordChecked) { //generamos token de ingreso si la contraseña es correcta
            const token = jwt.sign({ //creo token con esta info
                id: userChecked._id,
                name: userChecked.name,
                lastname: userChecked.lastname,
                email: userChecked.email
            }, myTokenSecret, //doy secreto de validación
                { expiresIn: '1h' } //expira en 1h el token
            )
            console.log("token: ", token)
            return res.status(200).json(token)
        }
        return res.status(404).json({ msg: "Wrong password" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const verifyToken = async (req, res, next) => { //middleware que verifica token activo
    try {
        const token = req.headers.authorization.split(' ')[1]; // nos quedamos con el token antes de Bearer
        const decodedToken = jwt.verify(token, myTokenSecret)
        req.user = decodedToken;
        next()
    } catch (error) {
        res.status(403).json({ msg: "You are not authenticated", error })
    }
}

const forgotPasswordEmail = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'This email is not registered' });

        const sendingEmail = forgotEmail(user._id);

        const mail = new SendSmtpEmail();
        mail.subject = 'Reset password 🔐';
        mail.htmlContent = sendingEmail;
        mail.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' };
        mail.to = [{ email }];

        console.log('[BREVO] sender:', mail.sender.email, 'to:', mail.to.map(t => t.email));

        const resp = await brevo.sendTransacEmail(mail);
        return res.status(200).json({ ok: true, id: resp.body.messageId || null, resp: resp.body });
    } catch (error) {
        console.error('BREVO forgotPasswordEmail:', error?.response?.body || error?.body || error);
        return res.status(500).json({ ok: false, error: error?.response?.body || error?.body || String(error) });
    }
};

const sendContactEmail = async (req, res) => {
    const { clientName, clientEmail, subject } = req.body
    try {
        const sendingEmail = contactEmail(clientName, clientEmail, subject)

        const email = new SendSmtpEmail();
        email.subject = 'New Client contact! ✉️';
        email.htmlContent = sendingEmail;
        email.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' };
        email.to = [{ email: 'hello@nanamendozago.com' }]; // receptor interno

        console.log('[BREVO] sender:', email.sender.email, 'to:', email.to.map(t => t.email));

        const resp = await brevo.sendTransacEmail(email);
        return res.status(200).json({ ok: true, id: resp.body.messageId || null, resp: resp.body });
    } catch (err) {
        console.error('BREVO sendContactEmail:', err?.response?.body || err?.body || err);
        return res.status(502).json({ ok: false, error: err?.response?.body || err?.body || String(err) });
    }
};

const sendChangePassword = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'This email is not registered' });

        const sendingEmail = changeEmail(user._id);

        const mail = new SendSmtpEmail();
        mail.subject = 'Change your Email 🔑';
        mail.htmlContent = sendingEmail;
        mail.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' };
        mail.to = [{ email }];

        console.log('[BREVO] sender:', mail.sender.email, 'to:', mail.to.map(t => t.email));

        const resp = await brevo.sendTransacEmail(mail);
        return res.status(200).json({ ok: true, id: resp.body.messageId || null, resp: resp.body });
    } catch (error) {
        console.error('BREVO sendChangeEmail:', error?.response?.body || error?.body || error);
        return res.status(500).json({ ok: false, error: error?.response?.body || error?.body || String(error) });
    }
};

const sendChangeEmail = async (req, res) => {
    const { email } = req.body
    try {
        const user = await userModel.findOne({ email });
        if (!user) return res.status(404).json({ msg: 'This email is not registered' });

        const sendingEmail = changePassword(user._id);

        const mail = new SendSmtpEmail();
        mail.subject = 'Change your password 🔐';
        mail.htmlContent = sendingEmail;
        mail.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' };
        mail.to = [{ email }];

        console.log('[BREVO] sender:', mail.sender.email, 'to:', mail.to.map(t => t.email));

        const resp = await brevo.sendTransacEmail(mail);
        return res.status(200).json({ ok: true, id: resp.body.messageId || null, resp: resp.body });
    } catch (error) {
        console.error('BREVO sendChangePassword:', error?.response?.body || error?.body || error);
        return res.status(500).json({ ok: false, error: error?.response?.body || error?.body || String(error) });
    }
};

module.exports = {
    getUser,
    updateUser,
    addUser,
    login,
    verifyToken,
    forgotPasswordEmail,
    sendContactEmail,
    sendChangePassword,
    sendChangeEmail,
}