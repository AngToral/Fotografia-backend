const express = require("express");
const { getUser, updateUser, login, addUser, forgotPasswordEmail, sendContactEmail, verifyToken } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/', getUser)
userRouter.put('/:id?', verifyToken, updateUser)
userRouter.post('/register', addUser)
userRouter.post('/login', login)
userRouter.post('/forgottenpassword', forgotPasswordEmail)
userRouter.post('/clientcontact', sendContactEmail)

module.exports = { userRouter }