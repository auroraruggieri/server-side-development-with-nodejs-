var express = require('express');
var morgan = require('morgan');

var dishRouter = require('./dishRouter');
var promoRouter = require('./promoRouter');
var leaderRouter = require('./leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();

app.use(morgan('dev'));

app.use('/dishes', dishRouter.router);
app.use('/promotions', promoRouter.router);
app.use('/leadership', leaderRouter.router);

// specifiying the location of files to serve up
app.use(express.static(__dirname + '/public'));

// starting up a server
app.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});