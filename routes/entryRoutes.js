const express = require("express");
const { getEntry, getEntryId, updateEntry, addEntry, deleteEntry } = require("../controllers/entryController");
const multer = require('multer');
const { verifyToken } = require("../controllers/userController");

const entryRouter = express.Router();
const blogUpload = multer({ dest: './images-blog' })

entryRouter.get('/', getEntry)
entryRouter.get('/:id?', getEntryId)
entryRouter.put('/:id?', blogUpload.single('imageBlog'), verifyToken, updateEntry)
entryRouter.post('/', blogUpload.single('imageBlog'), verifyToken, addEntry)
entryRouter.delete('/:id?', verifyToken, deleteEntry)

module.exports = { entryRouter }