const { userModel } = require("../models/user.model")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../transporter');
const { generateEmailTemplate } = require("../emails/forgotEmail");
const forgotEmail = require("../emails/forgotEmail");

const myTokenSecret = process.env.MYTOKENSECRET //creo secreto de firma para token

const getUser = async (req, res) => {
    try {
        const user = await userModel.find({ removedAt: { $eq: null } })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: "Error getting users", error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, { ...req.body })
        if (user) { return res.status(200).json({ msg: "User updated" }) }
        else return res.status(404).json({ msg: "User not found" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const addUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10) //encripto contraseña
    try {
        const user = await userModel.create({ email: req.body.email, password: hashedPassword }) //creo usuario con contraseña encriptada
        if (user) { return res.status(201).json({ msg: "User created" }) }
        else return res.status(404).json({ msg: "User not found" })
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
        const user = await userModel.findOne({ email: email })
        if (user) {
            const forgottenEmail = {
                from: "avtoral94@gmail.com",
                to: email,
                subject: "Restablecer contraseña",
                html: forgotEmail,
            };
            transporter.sendMail(forgottenEmail, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log("Email sent: " + info.response);
                }
            });
            console.log("Email sent")
            res.status(200).json(user);
        }
        if (!user) res.status(404).json({ msg: "This email is not registered" })
    }
    catch {
        res.status(500).json({ msg: "Error" })
    }
}

module.exports = {
    getUser,
    updateUser,
    addUser,
    login,
    verifyToken,
    forgotPasswordEmail,
}