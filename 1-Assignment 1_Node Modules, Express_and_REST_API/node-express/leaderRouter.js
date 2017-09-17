// Using Express Router to build a server supporting a REST API.
var express = require('express');
// BodyParser enables us to parse the data
var bodyParser = require('body-parser');

// That'll give me access to a Router object that is supported by Express
var leaderRouter = express.Router();
leaderRouter.use(bodyParser.json());

//  With route I don't need to explicitly specify the URL
leaderRouter.route('/')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
      res.end('Will send all the leaders to you!');
})

.post(function(req, res, next){
      res.end('Will add the leader: ' + req.body.name + ' with details: ' + req.body.description);    
})

.delete(function(req, res, next){
      res.end('Deleting all leaders');
});

//  With route I don't need to explicitly specify the URL
leaderRouter.route('/:leadershipId')
.all(function(req,res,next) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      next();
})

.get(function(req,res,next){
        res.end('Will send details of the leader: ' + req.params.leadershipId +' to you!');
})

.put(function(req, res, next){
        res.write('Updating the leader: ' + req.params.leadershipId + '\n');
        res.end('Will update the leader: ' + req.body.name + 
            ' with details: ' + req.body.description);
})

.delete(function(req, res, next){
        res.end('Deleting leader: ' + req.params.leadershipId);
});

// Both methods exports are valid
//module.exports = leaderRouter; 
exports.router = leaderRouter;
