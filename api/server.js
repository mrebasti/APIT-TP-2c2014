// server.js

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./models/userModel');

//Connect to MongoDB
mongoose.connect('mongodb://localhost/apitdb');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; 		// set our port


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); 				// get an instance of the express Router

//Event Log
router.use(function(req, res, next){
  console.log('HTTP Request recived.');
  next();
});


// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
	res.json({ message: 'hooray! welcome to our api!' });	
});

// API ROUTES:

router.route('/user')
	
  //POST for adding users to mongoDB collection
  .post(function(req, res){
    var user = new User();
    user.name = req.body.name;
    user.lastname = req.body.lastname;
    user.email = req.body.email;
    user.since = req.body.sinceDate;

    //Save user
    user.save(function(err){
      if (err)
        res.send(err);
    res.json({message: 'User Created'});
    });
  })

  //GET all users
  .get(function(req, res){
  	User.find(function(err, users){
  	  if (err)
  	  	res.send(err);

  	  res.json(users);
  	});
  });


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
