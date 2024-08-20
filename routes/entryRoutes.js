const express = require("express");
const { getEntry, getEntryId, updateEntry, addEntry, deleteEntry } = require("../controllers/entryController");

const entryRouter = express.Router();

entryRouter.get('/', getEntry)
entryRouter.get('/:id?', getEntryId)
entryRouter.put('/:id?', updateEntry)
entryRouter.post('/', addEntry)
entryRouter.delete('/:id?', deleteEntry)

module.exports = { entryRouter }