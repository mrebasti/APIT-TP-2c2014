// server.js

// call the packages we need
var express = require('express'); 		// call express
var app = express(); 				// define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Phone = require('./models/phoneModel');

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

router.route('/phone')
  
  .post(function(req, res){
    var phone = new Phone();
    phone.brand = req.body.brand;
    phone.model = req.body.model;
    phone.price = req.body.price;
    phone.d.wifi = req.body.d.wifi;
    phone.d.bluetooth = req.body.d.bluetooth;
    phone.d.ram = req.body.d.ram;
    phone.d.camera.definition = req.body.d.camera.definition;
    phone.d.camera.flash = req.body.d.camera.flash;
    phone.d.gps = req.body.d.gps;
    phone.d.so = req.body.d.so;

    //Save user
    user.save(function(err){
      if (err)
        res.send(err);
    res.json({message: 'Phone Created'});
    });
  })

  .get(function(req, res){

    Phone.find(function(err, phones){
      if (err)
        res.send(err);

      res.json(phones);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);