const reviewEmail = require("../emails/reviewEmail");
const sendReseñaEmail = require("../emails/sendReseñaEmail");
const sendReviewEmail = require("../emails/sendReviewEmail");
const { opinionModel } = require("../models/testimonials.model")
const transporter = require('../transporter');
const schedule = require('node-schedule');

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
            to: "hello@nanamendozago.com", //cambiar al de mariana
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

        // Verifica sesión SMTP (opcional si ya lo haces al arrancar)
        await transporter.verify();

        const info = await transporter.sendMail(reviewEmail);

        console.log('SMTP response:', info.response, 'messageId:', info.messageId);

        // Valida aceptación del servidor
        if (!info.response || !info.response.startsWith('250')) {
            return res.status(502).json({ msg: 'SMTP no aceptó el mensaje' });
        }

        return res.status(200).json({ msg: 'OK', id: info.messageId });

    } catch (err) {
        console.error('SMTP send error:', err);
        return res.status(500).json({ msg: 'Error enviando correo' });
    }
};

async function backendBot(req, res) {
    try {
        const response = await fetch('https://mariana-backend.onrender.com/testimonials')
        const data = await response.json();
        console.log('El bot está fucionando cada 7 min');
    } catch (error) {
        console.log('Error: ', error);
    }
}

schedule.scheduleJob('*/7 * * * *', async () => { //esto mueve el bot cada 7 min
    await backendBot();
});

module.exports = {
    getOpinion,
    getOpinionId,
    updateOpinion,
    addOpinion,
    deleteOpinion,
    sendReviewRequest,
    sendReseñaPeticion
}