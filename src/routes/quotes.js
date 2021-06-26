const express = require('express')
const Quote = require('../models/quotes')

const router = express.Router()  

router.get('/', async (req, res) => {
    const getQuotes = await Quote.find()

    res.json(getQuotes)
})

router.post('/new', async (req, res) => {
    const newQuote = new Quote(req.body)
    const saveQuote = await newQuote.save()

    res.json(saveQuote)
})

router.get('/get/:id', async (req, res) => {
    const quote = await Quote.findById({ _id: req.params.id })

    res.json(quote)
})

router.delete('/delete/:id', async (req, res) => {
    const result = await Quote.findByIdAndDelete({ _id: req.params.id })

    res.json(result)
})

router.patch('/update/:id', async (req, res) => {
    const quote = await Quote.updateOne({ _id: req.params.id }, { $set: req.body })

    res.json(quote) 
})

router.get('/random', async (req, res) => {
    const count = await Quote.countDocuments()
    const randomQuote = Math.floor(Math.random() * count)
    const quote = await Quote.findOne().skip(randomQuote)

    res.json(quote)
})

module.exports = router