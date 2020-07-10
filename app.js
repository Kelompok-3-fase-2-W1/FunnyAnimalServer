require('dotenv').config();
const express = require('express')
const app = express()
const router = require('./routers/index.js')
const cors = require('cors');
app.use(cors())

const PORT = process.env.port;

const errorHandler = require(`./middlewares/errorHandler`)

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use('/', router)
app.use(errorHandler);



app.listen(PORT, () => {
    console.log('app running', PORT)
})