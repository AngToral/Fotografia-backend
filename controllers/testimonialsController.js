const reviewEmail = require("../emails/reviewEmail");
const sendReseñaEmail = require("../emails/sendReseñaEmail");
const sendReviewEmail = require("../emails/sendReviewEmail");
const { opinionModel } = require("../models/testimonials.model")
const transporter = require('../transporter');

const getOpinion = async (req, res) => {
    try {
        const opinions = await opinionModel.find({ removedAt: { $eq: null } })
        res.status(200).json(opinions)
    } catch (error) {
        res.status(500).json({ msg: "Error getting opinions", error: error.message })
    }
}

const getOpinionId = async (req, res) => {
    try {
        const opinion = await opinionModel.findById(req.params.id)
        if (opinion) { return res.status(200).json(opinion) }
        else return res.status(404).json({ msg: "Opinion not found" })
    } catch (error) {
        return res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

const updateOpinion = async (req, res) => {
    try {
        const opinion = await opinionModel.findByIdAndUpdate(req.params.id, { ...req.body })
        if (opinion) { return res.status(200).json({ msg: "Opinion updated" }) }
        else return res.status(404).json({ msg: "Opinion not found" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const addOpinion = async (req, res) => {
    const { clientName, clientEmail, shootDate, testimonial } = req.body
    try {
        const opinion = await opinionModel.create({ ...req.body })
        const sendingEmail = reviewEmail(clientName, clientEmail, shootDate, testimonial, opinion._id)
        const opinionEmail = {
            from: "angtoral.dev@gmail.com",
            to: "avtoral94@gmail.com", //cambiar al de mariana
            subject: "New client review! 🔥",
            html: sendingEmail,
        };
        transporter.sendMail(opinionEmail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        res.status(201).json(opinion)
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const deleteOpinion = async (req, res) => {
    try {
        const opinion = await opinionModel.findByIdAndUpdate(req.params.id, { removedAt: new Date(), })
        if (opinion) { return res.status(200).json(opinion) }
        else return res.status(404).json({ msg: "Opinion not found" })
    } catch (error) {
        res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

const sendReviewRequest = async (req, res) => {
    const { clientEmail, clientName } = req.body
    try {
        const sendingEmail = sendReviewEmail(clientName)

        const reviewEmail = {
            from: "angtoral.dev@gmail.com",
            to: clientEmail,
            subject: "Hello, there! 😊",
            html: sendingEmail,
        };
        transporter.sendMail(reviewEmail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log("Email sent")
        res.status(200).json("Ok");
    }
    catch {
        res.status(500).json({ msg: "Error" })
    }
}

const sendReseñaPeticion = async (req, res) => {
    const { clienteEmail, clienteNombre } = req.body
    try {
        const sendingEmail = sendReseñaEmail(clienteNombre)

        const reviewEmail = {
            from: "angtoral.dev@gmail.com",
            to: clienteEmail,
            subject: "¡Hola, hola! 😊",
            html: sendingEmail,
        };
        transporter.sendMail(reviewEmail, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Email sent: " + info.response);
            }
        });
        console.log("Email sent")
        res.status(200).json("Ok");
    }
    catch {
        res.status(403).json({ msg: "Error, forbidden" })
    }
}

module.exports = {
    getOpinion,
    getOpinionId,
    updateOpinion,
    addOpinion,
    deleteOpinion,
    sendReviewRequest,
    sendReseñaPeticion
}