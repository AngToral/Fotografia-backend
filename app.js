const express = require('express')
const app = express()

const port = 3000

require('dotenv').config()
const mongoose = require("mongoose")

app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    //console.log("El usuario de la base de datos es: ", process.env.DB_USER)
});

module.exports = { app, server };