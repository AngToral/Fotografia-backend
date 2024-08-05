const { entryModel } = require("../models/entry.model")


const getPhoto = async (req, res) => {
    try {
        const photos = await entryModel.find({ removedAt: { $eq: null } })
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json({ msg: "Error getting photos", error: error.message })
    }
}

const getPhotoId = async (req, res) => {
    try {
        const photo = await entryModel.findById(req.params.id)
        if (photo) { return res.status(200).json(photo) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        return res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

const updatePhoto = async (req, res) => {
    try {
        const photo = await entryModel.findByIdAndUpdate(req.params.id, { ...req.body })
        if (photo) { return res.status(200).json({ msg: "Photo updated" }) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const addPhoto = async (req, res) => {
    try {
        const photo = await entryModel.create({ ...req.body })
        res.status(201).json({ msg: "Photo created", id: photo._id })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const deletePhoto = async (req, res) => {
    try {
        const photo = await entryModel.findByIdAndUpdate(req.params.id, { removedAt: new Date(), })
        if (photo) { return res.status(200).json({ msg: "Photo removed successfully" }) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

module.exports = {
    getPhoto,
    getPhotoId,
    updatePhoto,
    addPhoto,
    deletePhoto,
}