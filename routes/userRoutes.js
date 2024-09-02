const express = require("express");
const { getUser, updateUser, login, addUser, forgotPasswordEmail, sendContactEmail } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/', getUser)
userRouter.put('/:id?', updateUser)
userRouter.post('/register', addUser)
userRouter.post('/login', login)
userRouter.post('/forgottenpassword', forgotPasswordEmail)
userRouter.post('/clientcontact', sendContactEmail)

module.exports = { userRouter }