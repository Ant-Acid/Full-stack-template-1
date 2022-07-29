const express = require('express') //import express
const app = express() //create express app
const cors = require('cors') //import cors
const mongoose = require('mongoose') //import mongoose
require('dotenv').config() //import dotenv
const PORT = 8000 //set port
const TestModel = require('./models/schema') //import schema

//connection async function
const connectDB = async () => { //connect to database
    try { //try to connect
        await mongoose.connect(process.env.DB_STRING,  //connect to database
            { useNewUrlParser: true })  //set options
        console.log(`Connected to database: ${mongoose.connection.name}`)   //log connection
    } catch (err) { //if error
        console.log(`Failed to connect`, err)   //log error
    }
}

connectDB() //connect to database

//Middleware
app.set('view engine', 'ejs')    //set view engine
app.use(express.static('public'))   //set static folder
app.use(express.urlencoded({ extended: true })) //set extended to true
app.use(express.json()) //set json
app.use(cors()) //set cors

app.get('/', async (request, response) => { //get request
    try {   //try to get data
        const content = await TestModel.find()  //get data
        console.log(content);   //log data
        response.render('index.ejs',{contentKey: content})  //render index.ejs
    } catch (error) {   //if error
        response.status(500).send({ message: error.message })   //send error
    }
})


//PORT = 8000 stored in .env
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})