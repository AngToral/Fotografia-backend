const express = require("express");
const { getEntry, getEntryId, updateEntry, addEntry, deleteEntry } = require("../controllers/entryController");
const multer = require('multer');

const entryRouter = express.Router();
const blogUpload = multer({ dest: './images-blog' })

entryRouter.get('/', getEntry)
entryRouter.get('/:id?', getEntryId)
entryRouter.put('/:id?', updateEntry)
entryRouter.post('/', blogUpload.single('imageBlog'), addEntry)
entryRouter.delete('/:id?', deleteEntry)

module.exports = { entryRouter }