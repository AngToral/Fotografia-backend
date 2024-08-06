const express = require("express");
const { getUser, updateUser, login, addUser } = require("../controllers/userController");

const userRouter = express.Router();

userRouter.get('/', getUser)
userRouter.put('/:id?', updateUser)
userRouter.post('/register', addUser)
userRouter.post('/login', login)

module.exports = { userRouter }