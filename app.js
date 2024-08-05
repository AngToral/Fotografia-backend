require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const { photoRouter } = require('./routes/entryRoutes')

app.use(cors(corsOptions));
var corsOptions = {
    origin: '*',
}

const mongoose = require("mongoose")
const mongoDB = "mongodb+srv://" + process.env.DB_USER + ":" + process.env.DB_PASSWORD + "@" + process.env.DB_SERVER + "/" + process.env.DB_NAME + "?retryWrites=true&w=majority";
async function main() {
    await mongoose.connect(mongoDB);
}
main().catch(err => console.log(err));

app.use(express.json())

app.use('/gallery', photoRouter)

const server = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
    console.log("El usuario de la base de datos es: ", process.env.DB_USER)
});

module.exports = { app, server };