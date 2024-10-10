const express = require("express");
const { getUser, updateUser, login, addUser, forgotPasswordEmail, sendContactEmail, verifyToken, sendChangePassword, sendChangeEmail } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/:id?', getUser)
userRouter.put('/:id?', updateUser)
userRouter.post('/register', addUser)
userRouter.post('/login', login)
userRouter.post('/forgottenpassword', forgotPasswordEmail)
userRouter.post('/changepassword', verifyToken, sendChangePassword)
userRouter.post('/changeemail', verifyToken, sendChangeEmail)
userRouter.post('/clientcontact', verifyToken, sendContactEmail)

module.exports = { userRouter }