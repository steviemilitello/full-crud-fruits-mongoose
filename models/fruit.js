/////////////////////////////////////////////////
////////////// DEPENDENCIES /////////////////////
/////////////////////////////////////////////////

// import our dependencies
const mongoose = require('./connection')

/////////////////////////////////////////////////
////////////// FRUITS MODEL /////////////////////
/////////////////////////////////////////////////

// define our fruits model 
// pull the Schema and model constructors from mongoose 
// we are going to use something called destructing to accomplish this 
// pulling items, can be done on object and arrays
const { Schema, model } = mongoose

// make our fruit Schema 

const fruitSchema = new Schema({
    name: {type: String },
    color: { type: String },
    readyToEat: { type: Boolean }
}, { timestamps: true })

// make our fruit model 

const Fruit = model('Fruit', fruitSchema)

/////////////////////////////////////////////////
////////////// EXPORT MODEL /////////////////////
/////////////////////////////////////////////////

module.exports = Fruit


