const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()
const PORT = 8000
const TestModel = require('./models/schema')

//connection async function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DB_STRING,
            { useNewUrlParser: true })
        console.log(`Connected to database: ${mongoose.connection.name}`)
    } catch (err) {
        console.log(`Failed to connect`, err)
    }
}

connectDB()

//Middleware
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/', async (request, response) => {
    try {
        const content = await TestModel.find()
        console.log(content);
        response.render('index.ejs',{contentKey: content})
    } catch (error) {
        response.status(500).send({ message: error.message })
    }
})


//PORT = 8000 stored in .env
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})