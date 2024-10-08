const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    theme1: {
        type: String,
        enum: ["Deportes", "Retrato", "Fotoperiodismo", "Escenario", "Evento", "Paisaje", "Mujer", "Hombre", "Pareja", "Animal", "Mascota"],
        required: true,
    },
    theme2: {
        type: String,
        enum: ["Deportes", "Retrato", "Fotoperiodismo", "Escenario", "Evento", "Paisaje", "Mujer", "Hombre", "Pareja", "Animal", "Mascota", "undefined"],
    },
    imageGallery: {
        type: String,
        required: true,
    },
    photoDate: {
        type: Date,
        required: true,
    },
    removedAt: Date
},
    { timestamps: true }
)

const photoModel = mongoose.model("photoModel", photoSchema);

module.exports = { photoModel }