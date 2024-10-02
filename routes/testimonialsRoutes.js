const express = require("express");
const { getOpinion, getOpinionId, updateOpinion, addOpinion, deleteOpinion, sendReviewRequest, sendReseñaPeticion } = require("../controllers/testimonialsController");

const testimonialsRouter = express.Router();

testimonialsRouter.get('/', getOpinion)
testimonialsRouter.get('/:id?', getOpinionId)
testimonialsRouter.put('/:id?', updateOpinion)
testimonialsRouter.post('/', addOpinion)
testimonialsRouter.delete('/:id?', deleteOpinion)
testimonialsRouter.post('/reviewrequest', sendReviewRequest)
testimonialsRouter.post('/solicituresena', sendReseñaPeticion)

module.exports = { testimonialsRouter }