// Using Express Router to build a server supporting a REST API.
var express = require('express');
// BodyParser enables us to parse the data
var bodyParser = require('body-parser');

// That'll give me access to a Router object that is supported by Express
var dishRouter = express.Router();
dishRouter.use(bodyParser.json());

//  With route I don't need to explicitly specify the URL
dishRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
      res.end('Will send all the dishes to you!');
})

.post(function(req, res, next){
      res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
      res.end('Deleting all dishes');
});

//  With route I don't need to explicitly specify the URL
dishRouter.route('/:dishId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the dish: ' + req.params.dishId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting dish: ' + req.params.dishId);
});

// Both methods exports are valid
// module.exports = dishRouter; 
exports.router = dishRouter;