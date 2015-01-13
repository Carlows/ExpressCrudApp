var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var routes = require('./routes/index');
var apiRoutes = require('./routes/api');
var dbconfig = require('./dbconfig');
var colors = require('colors/safe');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// database setup
var connectionString = dbconfig.databaseUrl + dbconfig.databaseName;

mongoose.connect(connectionString, function(err, res){
    if(err){
        console.log(colors.red('There was an error connecting to the MongoDB database:') + err);
    }
    else{
        console.log(colors.green('Connected to the database succesfully.'));
    }
});

// middleware
// imprime informacion sobre la solicitud.
app.use(function(req, res, next){
    console.log(" - " + colors.green(req.method) + " - " + req.path);
    next();
});

// routes
app.use('/', routes);
app.use('/api', apiRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: err
    });
});


module.exports = app;
