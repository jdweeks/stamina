const express = require('express');
const router = express.Router();

const passport = require('passport');
const account = require('../model/account');

router.get('/', function(req, res) {
  if (!req.user) res.redirect('/login');
  else res.render('index', { user: req.user });
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.post('/register', function(req, res) {
  account.register(new account({ username : req.body.username }), req.body.password, function(err, account) {
    if (err) {
      return res.render('register', { account : account });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });
});

router.get('/login', function(req, res) {
  res.render('login', { user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
  res.redirect('/');
});

router.get('/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;
