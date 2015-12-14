var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

router.get('/?', function(req, res) {
  var query = {
      'user': req.user.username,
      'exercise': req.query.name
  };
  mongoose.model('Workout').find(query, function(err, data) {
    var max = 0;
    for (var j = 0; j < data.length; j++) {
      var curr = data[j];
      max = (max < curr.weight) ? curr.weight : max;
    }
    res.json(max);
  });
});

module.exports = router;
