// Using Express Router to build a server supporting a REST API.
var express = require('express');
// BodyParser enables us to parse the data
var bodyParser = require('body-parser');

// That'll give me access to a Router object that is supported by Express
var promoRouter = express.Router();
promoRouter.use(bodyParser.json());

//  With route I don't need to explicitly specify the URL
promoRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
      res.end('Will send all the promotions to you!');
})

.post(function(req, res, next){
      res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
      res.end('Deleting all promotions');
});

//  With route I don't need to explicitly specify the URL
promoRouter.route('/:promotionsId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
      res.end('Will send details of the promotion: ' + req.params.promotionsId +' to you!');
})

.put(function(req, res, next){
      res.write('Updating the promotion: ' + req.params.promotionsId + '\n');
      res.end('Will update the promotion: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
      res.end('Deleting promotion: ' + req.params.promotionsId);
});

// Both methods exports are valid
//module.exports = promoRouter; 
exports.router = promoRouter;
