// Using Express Router to build a server supporting a REST API.
var express = require('express');
// BodyParser enables us to parse the data
var bodyParser = require('body-parser');
// Controlling Routes with Authentication
var Verify = require('./verify');
// For MongoDB schema
var mongoose = require('mongoose');

var Favorites = require('../models/favorites');

// That'll give me access to a Router object that is supported by Express
var favoriteRouter = express.Router();
favoriteRouter.use(bodyParser.json());

//  With route I don't need to explicitly specify the URL
favoriteRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Favorites.find({'postedBy': req.decoded._doc._id})
        .populate('postedBy')
		.populate('dishes')
		.exec(function (err, favorite) {
          if (err) throw err;
          res.json(favorite);
        });
})

.post(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOne({'postedBy': req.decoded._doc._id}, function (err, favorite) {
            if (err) throw err;
            if (!favorite) {
                Favorites.create(req.body, function (err, favorite) {
                    if (err) throw err;
                    console.log('Favorite created!');
                    favorite.postedBy = req.decoded._doc._id;
                    favorite.dishes.push(req.body._id);
                    favorite.save(function (err, favorite) {
                        if (err) throw err;
                        res.json(favorite);
                    });
                });
            } else {
                var dish = req.body._id;

                if (favorite.dishes.indexOf(dish) == -1) {
                    favorite.dishes.push(dish);
                }
                favorite.save(function (err, favorite) {
                    if (err) throw err;
                    res.json(favorite);
                });
            }
        });
    })

.delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.remove({'postedBy': req.decoded._doc._id}, function (err, resp) {
            if (err) throw err;
            res.json(resp);
        });
    });

favoriteRouter.route('/:dishId')

    .delete(Verify.verifyOrdinaryUser, function (req, res, next) {
        Favorites.findOneAndUpdate({'postedBy': req.decoded._doc._id}, {$pull: {dishes: req.params.dishId}}, function (err, favorite) {
            if (err) throw err;
            Favorites.findOne({'postedBy': req.decoded._doc._id}, function(err, favorite){
                res.json(favorite);
            });
        });
    });

module.exports = favoriteRouter;
