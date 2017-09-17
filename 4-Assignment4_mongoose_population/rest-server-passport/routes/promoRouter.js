// Using Express Router to build a server supporting a REST API.
var express = require('express');
// BodyParser enables us to parse the data
var bodyParser = require('body-parser');
// Controlling Routes with Authentication
var Verify = require('./verify');
// For MongoDB schema
var mongoose = require('mongoose');

var Promotions = require('../models/promotions');
// That'll give me access to a Router object that is supported by Express
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

//  With route I don't need to explicitly specify the URL
promoRouter.route('/')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.find({}, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.post(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.create(req.body, function (err, promo) {
        if (err) throw err;
        console.log('Promotion created!');
        var id = promo._id;

        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end('Added the promotion with id: ' + id);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.remove({}, function (err, resp) {
        if (err) throw err;
        res.json(resp);
    });
});

//  With route I don't need to explicitly specify the URL
promoRouter.route('/:promoId')
.get(Verify.verifyOrdinaryUser, function (req, res, next) {
    Promotions.findById(req.params.promoId, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.put(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndUpdate(req.params.promoId, {
        $set: req.body
    }, {
        new: true
    }, function (err, promo) {
        if (err) throw err;
        res.json(promo);
    });
})

.delete(Verify.verifyOrdinaryUser, Verify.verifyAdmin, function (req, res, next) {
    Promotions.findByIdAndRemove(req.params.promoId, function (err, resp) {        
	    if (err) throw err;
        res.json(resp);
    });
});

module.exports = promoRouter; 

