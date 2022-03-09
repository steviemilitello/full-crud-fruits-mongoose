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
    // console.log('the Fruit Model', Fruit)
    res.send('your server is running, better go catch it')
})

app.get('/fruits/seed', (req, res) => {
    // arr of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false }
      ]
      // when we seed data, there are a few steps involved 
      // delete all data that already exists (will only happen if data exists)
      Fruit.remove({})
        .then(fruit => {
            console.log('this is what remove returns', fruit)
            // create our seed data
            Fruit.create(startFruits)
                .then(fruit => {
                    console.log('this is what create returns', fruit)
                    res.send(fruit)
                })
        })
      // then we can send if we want to see the data
})

// index route

app.get('/fruits', (req, res) => {
    // find the fruits 
    Fruit.find({})
        // then render a template AFTER they're found 
        .then(fruits => {
            console.log(fruits)
            res.render('fruits/index', { fruits })
        })
         // show an error if there is one
         .catch(error => {
             console.log(error)
             res.json({ error })
         })
})

// new route -> GET route that renders our page with the form

app.get('/fruits/new', (rew, res) => {
    res.render('fruits/new')
})

// create route => POST route that actually calls the database and makes a new document

app.post('/fruits', (req, res) => {
    // check if the readyToEat property should be true or false
    // we can check AND set this property in one line of code
    // first part sets the property name
    // second is a ternary operator to set the value
    // if first thing is true do the that, otherwise do thing after colon
    req.body.readyToEat = req.body.readyToEat === 'on' ? true: false
    console.log('this is the fruit to create', req.body)
    // now we're ready for mongoose to do it's thing
    Fruit.create(req.body)
    .then(fruit => {
        console.log('this was returned from create', fruit)
        res.redirect('/fruits')
    })
    .catch(err => {
        console.log(err)
        res.json({ err })
    })
})

// edit route -> GET that takes us to edit form view

app.get('/fruits/:id/edit', (req, res) => {
    // we need to get the id 
    const fruitId = req.params.id
    // find the fruit
    Fruit.findById(fruitId)
    // --> render if there is a fruit 
    .then(fruit => {
        res.render('fruits/edit', { fruit })
    })
    // error if no fruit
    .catch(err => {
        console.log(err)
        res.json({ err })
    })
    
})

// update route -> sends a PUT request to our database

app.put('/fruits/:id', (req, res) => {
    // we need to get id
    const fruitId = req.params.id
    // check and assign readyToEat property with correct value
    req.body.readyToEat = req.body.readyToEat === 'on' ? true: false
    // tell mongoose to update the fruit
    Fruit.findByIdAndUpdate(fruitId, req.body, { new: true })
        .then(fruit => {
            console.log('the updated fruit', fruit)
            // if successful -> redirect to fruit page
            res.redirect(`/fruits/${fruit.id}`)
        })
        // error if no fruit
        // can add error on one line if no additional information
        .catch(error => res.json(error))

})

// show route 

app.get('/fruits/:id', (req, res) => {
    // first, we need to get the id
    const fruitId = req.params.id
    // then we can find a fruit by its id
    Fruit.findById(fruitId)
    // once found, we can render a view with the data
        .then(fruit => {
            res.render('fruits/show', { fruit })
        })
    // if there is an error, show that instead
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

// delete route

app.delete('/fruits/:id', (req, res) => {
    // get the fruit id 
    const fruitId = req.params.id
    // delete the fruit
    Fruit.findByIdAndRemove(fruitId)
        .then (fruit => {
            console.log('this is the response from FBID', fruit)
            res.redirect('/fruits')
        })
        .catch(err => {
            console.log(err)
            res.json({ err })
        })
})

/////////////////////////////////////////////////
////////////// SERVER LISTENER //////////////////
/////////////////////////////////////////////////

// is how we get the info from our .env file
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`app is listening on port: ${PORT}`)
})