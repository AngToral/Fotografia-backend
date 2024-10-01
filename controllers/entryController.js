const { entryModel } = require("../models/entry.model")
const fs = require("node:fs");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getEntry = async (req, res) => {
    try {
        const photos = await entryModel.find({ removedAt: { $eq: null } })
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json({ msg: "Error getting photos", error: error.message })
    }
}

const getEntryId = async (req, res) => {
    try {
        const photo = await entryModel.findById(req.params.id)
        if (photo) { return res.status(200).json(photo) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        return res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

const updateEntry = async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
            updateData.imageBlog = result.url;
        }
        const photo = await entryModel.findByIdAndUpdate(req.params.id, updateData)
        if (photo) { return res.status(200).json({ msg: "Photo updated" }) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const addEntry = async (req, res) => {
    try {
        const { text, photoDate } = req.body
        const result = await cloudinary.uploader.upload(req.file.path)
        fs.unlinkSync(req.file.path);
        const photo = await entryModel.create({ text, photoDate, imageBlog: result.url })
        res.status(201).json({ msg: "Photo created", id: photo._id })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const deleteEntry = async (req, res) => {
    try {
        const photo = await entryModel.findByIdAndUpdate(req.params.id, { removedAt: new Date(), })
        if (photo) { return res.status(200).json({ msg: "Photo removed successfully" }) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

module.exports = {
    getEntry,
    getEntryId,
    updateEntry,
    addEntry,
    deleteEntry,
}