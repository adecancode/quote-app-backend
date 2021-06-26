const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

const app = express()
const port = 3000

mongoose.connect('mongodb+srv://testdb:testdb123@cluster0.wufep.mongodb.net/testdatabase?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection
db.once('open', () => { 
    console.log('Connected to db!')
})

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Api Working')
})

const quoteRoute = require('../src/routes/quotes')

app.use('/quotes', quoteRoute)

app.listen(port, () => console.log(`App listening on http://localhost:${port}`))