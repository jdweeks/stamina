var express = require('express');
var path = require('path');
var session = require('express-session');
var sass = require('node-sass-middleware');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./model/db');
var workout = require('./model/workouts');

var passport = require('passport');
var localStategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var workouts = require('./routes/workouts');
var app = express();

// sass setup
app.use(sass({
  src: __dirname + '/sass',
  dest: __dirname + '/public',
  debug: true,
  outputStyle: 'compressed'
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// authentication setup
app.use(session({
  secret: 'staminaworkouts',
  resave: false,
  saveUninitialized: false 
}));
app.use(passport.initialize());
app.use(passport.session());

// routing
app.use('/', routes);
app.use('/api/workouts', workouts);

// passport config
var account = require('./model/account');
passport.use(new localStategy(account.authenticate()));
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler (will print stacktrace)
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler (no stacktraces leaked to user)
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
