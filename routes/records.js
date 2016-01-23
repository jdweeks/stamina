const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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
  mongoose.model('Workout').find(query, function(err, data) {
    if (err) {
      res.status(400);
      res.send('Error retrieving: ' + err);
      return;
    }
    
    var max = 0;
    for (var j = 0; j < data.length; j++) {
      var curr = data[j];
      max = (max < curr.weight) ? curr.weight : max;
    }
    res.json(max);
  });
});

module.exports = router;
