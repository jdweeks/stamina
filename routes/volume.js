var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/?', function(req, res) {
  var query = {
      'user': req.user.username,
      'exercise': req.query.name
  };
  mongoose.model('Workout').find(query, function(err, data) {
    var vol = 0;
    for (var j = 0; j < data.length; j++) {
      var curr = data[j];
      vol += parseInt(curr.weight, 10) * parseInt(curr.sets, 10) * parseInt(curr.reps, 10);
    }
    res.json(vol);
  });
});

module.exports = router;
