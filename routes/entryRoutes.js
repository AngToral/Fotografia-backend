const express = require("express");
const { getPhoto, getPhotoId, updatePhoto, addPhoto } = require("../controllers/entryController");

const photoRouter = express.Router();

photoRouter.get('/', getPhoto)
photoRouter.get('/:id?', getPhotoId)
photoRouter.put('/:id?', updatePhoto)
photoRouter.post('/', addPhoto)

module.exports = { photoRouter }