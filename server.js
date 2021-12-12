// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var port = process.env.PORT || 8080;        // set our port

var bodyParser = require('body-parser');
const cors     = require('cors');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

// DATABASE SETUP
// =============================================================================
const db = require("./app/models");
db.sequelize.sync({ force: true }).then(() => {
  console.log("DB dropped and resynced");
});

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  //console.log('Something is happening.');
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

const articleRoutes = require('./app/routes/article.routes');
app.use('/api/article/', articleRoutes);

const arxivRoutes = require('./app/routes/arxiv.routes');
app.use('/api/arxiv/', arxivRoutes);

const authorRoutes = require('./app/routes/author.routes');
app.use('/api/author/', authorRoutes);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);