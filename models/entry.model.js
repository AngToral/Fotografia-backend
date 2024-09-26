const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const entrySchema = new Schema({
    text: {
        type: String,
        //required: true,
    },
    imageBlog: {
        type: String,
        //required: true,
    },
    photoDate: {
        type: Date,
        //required: true,
    },
    removedAt: Date
},
    { timestamps: true }
)

const entryModel = mongoose.model("entryModel", entrySchema);

module.exports = { entryModel }