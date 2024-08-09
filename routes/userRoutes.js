const express = require("express");
const { getUser, updateUser, login, addUser, forgotPasswordEmail } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/', getUser)
userRouter.put('/:id?', updateUser)
userRouter.post('/register', addUser)
userRouter.post('/login', login)
userRouter.put('/forgottenpassword', forgotPasswordEmail)

module.exports = { userRouter }