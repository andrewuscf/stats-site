// modules =================================================
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    methodOverride = require('method-override');

// configuration ===========================================

var db = require('./config/db');
var port = process.env.PORT || 8080;

mongoose.connect(db.url);

app.use(bodyParser.json());

app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(bodyParser.urlencoded({extended: true}));

app.use(methodOverride('X-HTTP-Method-Override'));

app.use('/static', express.static(__dirname + '/public'));


// routes ==================================================
require('./app/routes')(app); // configure our routes

// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);

// shoutout to the user                     
console.log('Server on port:' + port);

// expose app           
exports = module.exports = app;       