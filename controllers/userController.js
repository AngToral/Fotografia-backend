const { userModel } = require("../models/user.model")

const getUser = async (req, res) => {
    try {
        const user = await userModel.find({ removedAt: { $eq: null } })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ msg: "Error getting users", error: error.message })
    }
}

const updateUser = async (req, res) => {
    try {
        const user = await userModel.findByIdAndUpdate(req.params.id, { ...req.body })
        if (user) { return res.status(200).json({ msg: "User updated" }) }
        else return res.status(404).json({ msg: "User not found" })
    } catch (error) {
        res.status(400).json({ msg: "You missed some parameter", error: error.message })
    }
}

module.exports = {
    getUser,
    updateUser,
}