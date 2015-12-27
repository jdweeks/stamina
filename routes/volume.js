var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/?', function(req, res) {
  if (!req.user) {
    res.status(401);
    res.send('Error: unauthorized user');
    return;
  }
  var query = {
      'user': req.user.username,
      'exercise': req.query.name
  };
  mongoose.model('Workout').find(query).sort({'date': -1}).limit(7).exec(function(err, data) {
    if (err) {
      res.status(500);
      res.send('Error retrieving');
      return;
    }
    
    var vol = 0;
    var day_in_ms = 1000*60*60*24;
    var today = new Date();
    for (var j = 0; j < data.length; j++) {
      var curr = data[j];
      var diff = (today - new Date(curr.date)) / day_in_ms;
      if (diff < 8)
        vol += parseInt(curr.weight, 10) * parseInt(curr.sets, 10) * parseInt(curr.reps, 10);
    }
    res.json(vol);
  });
});

module.exports = router;
