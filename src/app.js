require('dotenv').config()
const express = require('express')
const app = express()

app.use(express.json())
app.use('/api/v1.0', require('./routes/bittrex.routes'))

app.listen(process.env.APP_PORT, () => {

    console.log(`Service listening on port ${process.env.APP_PORT}`)
    
})