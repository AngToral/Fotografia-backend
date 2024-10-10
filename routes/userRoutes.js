const express = require("express");
const { getUser, updateUser, login, addUser, forgotPasswordEmail, sendContactEmail, verifyToken, sendChangePassword, sendChangeEmail } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/:id?', getUser)
userRouter.put('/:id?', verifyToken, updateUser)
userRouter.post('/register', addUser)
userRouter.post('/login', login)
userRouter.post('/forgottenpassword', forgotPasswordEmail)
userRouter.post('/changepassword', sendChangePassword)
userRouter.post('/changeemail', sendChangeEmail)
userRouter.post('/clientcontact', sendContactEmail)

module.exports = { userRouter }