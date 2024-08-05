const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
    },
    phoneNumber: {
        type: Number,
    },
    removedAt: Date
},
    { timestamps: true }
)

const userModel = mongoose.model("userModel", userSchema);

module.exports = { userModel }