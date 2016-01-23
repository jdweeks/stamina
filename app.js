const express = require('express');
const path = require('path');
const session = require('express-session');
const favicon = require('serve-favicon');

const sass = require('node-sass-middleware');
const compression = require('compression');
const minify = require('express-minify');

const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const db = require('./model/db');
const workout = require('./model/workouts');

const passport = require('passport');
const localStategy = require('passport-local').Strategy;

const routes = require('./routes/index');
const workouts = require('./routes/workouts');
const volume = require('./routes/volume');
const records = require('./routes/records');
const contact = require('./routes/contact');
const app = express();

// sass setup
app.use(sass({
  src: __dirname + '/sass',
  dest: __dirname + '/public',
  debug: true
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(compression());
app.use(minify({cache: __dirname + '/cache'}));
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
app.use('/api/volume', volume)
app.use('/api/records', records);
app.use('/contact', contact);

// passport config
var account = require('./model/account');
passport.use(new localStategy(account.authenticate()));
passport.serializeUser(account.serializeUser());
passport.deserializeUser(account.deserializeUser());

// favicon
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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
