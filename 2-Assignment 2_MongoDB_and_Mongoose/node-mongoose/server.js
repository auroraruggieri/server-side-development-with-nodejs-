var mongoose = require('mongoose'),
    assert = require('assert');

var Dishes = require('./models/dishes');
var Promotions = require('./models/promotions');
var Leaders = require('./models/leadership');
// Connection URL
var url = 'mongodb://localhost:27017/conFusion';
mongoose.connect(url);
// For the deprecation Promise warning, whit this line code Promise will be handle with no problem
mongoose.Promise = global.Promise;

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log("Connected correctly to server");

    // create a new dish
    Dishes.create({
        name: 'Uthapizza',
        image: 'images/uthapizza.png',
        category: 'mains',
        label: 'Hot',
        price: '$4.99',
		description: 'A unique combination of Indian Uthappam (pancake) and Italian pizza, topped with Cerignola olives,ripe vine cherry tomatoes, Vidalia onion, Guntur chillies and Buffalo Paneer.',
        comments: [
            {
          rating: 5,
          comment: 'Imagine all the eatables, living in conFusion!',
          author: 'John Lemon'
           },
           {
          rating: 4,
          comment: 'Sends anyone to heaven, I wish I could get my mother-in-law to eat it!',
          author: 'Paul McVites'
          }
        ]
    }, function (err, dish) {
        if (err) throw err;
        console.log('Dish created!');
        console.log(dish);

        var id = dish._id;

        // get all the dishes
        setTimeout(function () {
            Dishes.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Dish'
                    }
                }, {
                    new: true
                })
                .exec(function (err, dish) {
                    if (err) throw err;
                    console.log('Updated Dish!');
                    console.log(dish);

                    dish.comments.push({
                        rating: 5,
                        comment: 'I\'m getting a sinking feeling!',
                        author: 'Leonardo di Carpaccio'
                    });

                    dish.save(function (err, dish) {
                        console.log('Updated Comments!');
                        console.log(dish);
                    });
                });
        }, 3000);
    });
	
	// create a new promotion
    Promotions.create({
        name: 'Weekend Grand Buffet',
        image: 'images/buffet.png',
        label: 'New',
        price: '$19.99',
		description: 'Featuring mouthwatering combinations with a choice of five different salads, six enticing appetizers, six main entrees and five choicest desserts. Free flowing bubbly and soft drinks. All for just $19.99 per person.'
 },function (err, promotion) {
        if (err) throw err;
        console.log('Promotion created!');
        console.log(promotion);
		
		var id = promotion._id;
		
		// get all the promotions
        setTimeout(function () {
            Promotions.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Promotion'
                    }
                }, {
                    new: true
                })
                .exec(function (err, promotion) {
                    if (err) throw err;
                    console.log('Updated Promotion!');
                    console.log(promotion);
			    });
        }, 3000);
    }); 
	
	// create a new leader
    Leaders.create({
        name: 'Peter Pan',
        image: 'images/alberto.png',
        designation: 'Chief Epicurious Officer',
        abbr: 'CEO',
        description: 'Our CEO, Peter, credits his hardworking East Asian immigrant parents who undertook the arduous journey to the shores of America with the intention of giving their children the best future. His mother\'s wizardy in the kitchen whipping up the tastiest dishes with whatever is available inexpensively at the supermarket, was his first inspiration to create the fusion cuisines for which The Frying Pan became well known. He brings his zeal for fusion cuisines to this restaurant, pioneering cross-cultural culinary connections.'
 },function (err, leader) {
        if (err) throw err;
        console.log('Leader created!');
        console.log(leader);

        var id = leader._id;
		
		// get all the leaders
        setTimeout(function () {
            Leaders.findByIdAndUpdate(id, {
                    $set: {
                        description: 'Updated Leader'
                    }
                }, {
                    new: true
                })
                .exec(function (err, leader) {
                    if (err) throw err;
                    console.log('Updated Leader!');
                    console.log(leader);
			    });
        }, 3000);
    }); 
	
	setTimeout(function(){

        db.collection('dishes').drop(function () {
            db.collection('promotions').drop(function () {
                db.collection('leaders').drop(function () {
                    db.close();
                });
            });
        });

    }, 12000);
});//