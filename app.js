const express = require('express')
const app = express()
const router = require('./routers/index.js')

const PORT = 3000;

const errorHandler = require(`./middlewares/errorHandler`)

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', router)
app.use(errorHandler);


app.listen(PORT, () => {
    console.log('app running', PORT)
})