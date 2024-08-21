const express = require("express");
const { getPhoto, getPhotoId, updatePhoto, addPhoto, deletePhoto, addImage } = require("../controllers/photoController");
const multer = require('multer');

const photoRouter = express.Router();
const galleryUpload = multer({ dest: './images-gallery' })

photoRouter.get('/', getPhoto)
photoRouter.get('/:id?', getPhotoId)
photoRouter.put('/:id?', updatePhoto)
photoRouter.post('/', addPhoto)
photoRouter.post('/upload/:id?', galleryUpload.single('imageGallery'), addImage)
photoRouter.delete('/:id?', deletePhoto)

module.exports = { photoRouter }