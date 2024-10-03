const express = require("express");
const { getOpinion, getOpinionId, updateOpinion, addOpinion, deleteOpinion, sendReviewRequest, sendReseñaPeticion } = require("../controllers/testimonialsController");
const { verifyToken } = require("../controllers/userController");

const testimonialsRouter = express.Router();

testimonialsRouter.get('/', getOpinion)
testimonialsRouter.get('/:id?', getOpinionId)
testimonialsRouter.put('/:id?', updateOpinion)
testimonialsRouter.post('/', addOpinion)
testimonialsRouter.delete('/:id?', verifyToken, deleteOpinion)
testimonialsRouter.post('/reviewrequest', verifyToken, sendReviewRequest)
testimonialsRouter.post('/solicituresena', verifyToken, sendReseñaPeticion)

module.exports = { testimonialsRouter }