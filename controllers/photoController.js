const { photoModel } = require("../models/photo.model")
const fs = require("node:fs");
const cloudinary = require("cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const getPhoto = async (req, res) => {
    try {
        const photos = await photoModel.find({ removedAt: { $eq: null } })
        res.status(200).json(photos)
    } catch (error) {
        res.status(500).json({ msg: "Error getting photos", error: error.message })
    }
}

const getPhotoId = async (req, res) => {
    try {
        const photo = await photoModel.findById(req.params.id)
        if (photo) { return res.status(200).json(photo) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        return res.status(403).json({ msg: "Forbidden", error: error.message })
    }
}

const updatePhoto = async (req, res) => {
    try {
        const updateData = req.body;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);
            updateData.imageGallery = result.url;
        }
        const photo = await photoModel.findByIdAndUpdate(req.params.id, { ...req.body })
        if (photo) { return res.status(200).json({ msg: "Photo updated" }) }
        else return res.status(404).json({ msg: "Photo not found" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const addPhoto = async (req, res) => {
    try {
        const { theme1, theme2, photoDate } = req.body
        const result = await cloudinary.uploader.upload(req.file.path)
        fs.unlinkSync(req.file.path);
        console.log("result", result)
        const photo = await photoModel.create({ theme1, theme2, photoDate, imageGallery: result.url })
        console.log(photo)
        res.status(201).json({ msg: "Photo created", id: photo._id })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

const deletePhoto = async (req, res) => {
    try {
        const photo = await photoModel.findByIdAndUpdate(req.params.id, { removedAt: new Date(), })
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