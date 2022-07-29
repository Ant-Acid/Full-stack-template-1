const mongoose = require('mongoose')    //import mongoose
const testSchema = new mongoose.Schema({    //create schema
    item1: {    
        type: String    
    }, 
    item2 : { 
        type: String    
    }
})
module.exports = mongoose.model('TestModel', testSchema, 'test_collection') //export schema