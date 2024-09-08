const { opinionModel } = require("../models/testimonials.model")


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
    try {
        const opinion = await opinionModel.create({ ...req.body })
        res.status(201).json({ msg: "Opinion created", id: opinion._id })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const deleteOpinion = async (req, res) => {
    try {
        const opinion = await opinionModel.findByIdAndUpdate(req.params.id, { removedAt: new Date(), })
        if (opinion) { return res.status(200).json({ msg: "Opinion removed successfully" }) }
        else return res.status(404).json({ msg: "Opinion not found" })
    } catch (error) {
        res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

module.exports = {
    getOpinion,
    getOpinionId,
    updateOpinion,
    addOpinion,
    deleteOpinion,
}