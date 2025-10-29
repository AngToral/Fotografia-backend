const reviewEmail = require("../emails/reviewEmail");
const sendReseñaEmail = require("../emails/sendReseñaEmail");
const sendReviewEmail = require("../emails/sendReviewEmail");
const { opinionModel } = require("../models/testimonials.model")
const { brevo, SendSmtpEmail } = require('../brevo');
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
        const email = new SendSmtpEmail();
        email.subject = 'New Client review! 🔥';
        email.htmlContent = sendingEmail;
        email.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' };
        email.to = [{ email: 'hello@nanamendozago.com' }]; // destino interno (cámbialo si procede)
        // email.replyTo = { email: 'hola@nanamendozago.com' }; // opcional

        const resp = await brevo.sendTransacEmail(email);
        return res.status(201).json({ ok: true, opinion, id: resp.body.messageId || null, resp: resp.body });
    } catch (error) {
        console.error('BREVO addOpinion error:', error?.response?.body || error?.body || error);
        return res.status(400).json({ ok: false, msg: 'You missed some parameter', error: error?.response?.body || error?.body || String(error) });
    }
};

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

        const email = new SendSmtpEmail();
        email.subject = 'Hello, there! 😊';
        email.htmlContent = sendingEmail;
        email.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' }; // remitente verificado
        email.to = [{ email: clientEmail }];

        const resp = await brevo.sendTransacEmail(email);
        return res.status(200).json({ ok: true, id: resp.body.messageId || null, resp: resp.body });
    } catch (err) {
        console.error('BREVO sendReviewRequest error:', err?.response?.body || err?.body || err);
        return res.status(502).json({ ok: false, error: err?.response?.body || err?.body || String(err) });
    }
};

const sendReseñaPeticion = async (req, res) => {
    const { clienteEmail, clienteNombre } = req.body
    try {
        const sendingEmail = sendReseñaEmail(clienteNombre);

        const email = new SendSmtpEmail();
        email.subject = '¡Hola, hola! 😊';
        email.htmlContent = sendingEmail;
        email.sender = { name: 'Mariana Mendoza', email: 'hello@nanamendozago.com' };
        email.to = [{ email: clienteEmail }];

        console.log('[BREVO] sender:', email.sender?.email, 'to:', email.to?.map(t => t.email));

        const resp = await brevo.sendTransacEmail(email);
        // resp.body contiene messageId y estado
        return res.status(200).json({ ok: true, id: resp.body.messageId || null, resp: resp.body });
    } catch (err) {
        console.error('BREVO ERROR:', err?.response?.body || err?.body || err);
        return res.status(502).json({ ok: false, error: err?.response?.body || err?.body || String(err) });
    }
}

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