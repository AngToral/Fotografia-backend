const express = require("express");
const { getPhoto, getPhotoId, updatePhoto, addPhoto, deletePhoto } = require("../controllers/photoController");
const multer = require('multer');
const { verifyToken } = require("../controllers/userController");

const photoRouter = express.Router();
const galleryUpload = multer({ dest: './images-gallery' })

photoRouter.get('/', getPhoto)
photoRouter.get('/:id?', getPhotoId)
photoRouter.put('/:id?', galleryUpload.single('imageGallery'), verifyToken, updatePhoto)
photoRouter.post('/', galleryUpload.single('imageGallery'), verifyToken, addPhoto)
photoRouter.delete('/:id?', verifyToken, deletePhoto)

module.exports = { photoRouter }