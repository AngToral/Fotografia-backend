const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    lastname: {
        type: String,
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