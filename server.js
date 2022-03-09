/////////////////////////////////////////////////
////////////// DEPENDENCIES /////////////////////
/////////////////////////////////////////////////

// import our dependencies
// allows us to load our env variables
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const methodOverride = require('method-override')
const Fruit = require('./models/fruit')

/////////////////////////////////////////////////
////////////// EXPRESS APP OBJECT ///////////////
/////////////////////////////////////////////////

const app = require('liquid-express-views')(express())

/////////////////////////////////////////////////
////////////// MIDDLEWARE ///////////////////////
/////////////////////////////////////////////////

// this is for request logging 
app.use(morgan('tiny'))
app.use(methodOverride('_method'))
// parses urlencoded request bodies
app.use(express.urlencoded ({ extended: false }))
// to serve files from public statically
app.use(express.static('public'))

/////////////////////////////////////////////////
////////////// ROUTES ///////////////////////////
/////////////////////////////////////////////////

app.get('/', (req, res) => {
    console.log('the Fruit Model', Fruit)
    res.send('your server is running, better go catch it')
})

/////////////////////////////////////////////////
////////////// SERVER LISTENER //////////////////
/////////////////////////////////////////////////

// is how we get the info from our .env file
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})