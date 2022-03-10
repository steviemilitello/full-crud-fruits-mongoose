/////////////////////////////////////////////////
////////////// DEPENDENCIES /////////////////////
/////////////////////////////////////////////////

// import our dependencies
const mongoose = require('./connection')
const Fruit = require('./fruit')

/////////////////////////////////////////////////
////////////// SEED CODE ////////////////////////
/////////////////////////////////////////////////

const db = mongoose.connection

/////////////////////////////////////////////////
////////////// SEED DATA ////////////////////////
/////////////////////////////////////////////////

db.on('open', (req, res) => {
	// arr of starter fruits
	const startFruits = [
		{ name: 'Orange', color: 'orange', readyToEat: false },
		{ name: 'Grape', color: 'purple', readyToEat: false },
		{ name: 'Banana', color: 'orange', readyToEat: false },
		{ name: 'Strawberry', color: 'red', readyToEat: false },
		{ name: 'Coconut', color: 'brown', readyToEat: false },
	]

	// when we seed data, there are a few steps involved
	// delete all the data that already exists(will only happen if data exists)
	Fruit.remove({})
        .then((deletedFruits) => {
		    console.log('this is what remove returns', deletedFruits)
		    // then we create with our seed data
		    Fruit.create(startFruits)
                .then((data) => {
			        console.log('here are the new seed fruits', data)
                    // then we can send if we want to see that data
			        db.close()
		})
        .catch(error => {
            console.log(error)
            db.close()
        })
	})
    .catch(error => {
        console.log(error)
        db.close()
    })
})