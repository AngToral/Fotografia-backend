const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const opinionSchema = new Schema({
    clientName: {
        type: String,
        //required: true,
    },
    clientEmail: {
        type: String,
        //required: true,
    },
    shootDate: {
        type: Date,
        //required: true,
    },
    testimonial: {
        type: String,
        //required: true,
    },
    removedAt: Date
},
    { timestamps: true }
)

const opinionModel = mongoose.model("opinionModel", opinionSchema);

module.exports = { opinionModel }