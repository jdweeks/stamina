const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // parses POST info
const methodOverride = require('method-override'); // manipulates POST

router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride( function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/')
  // GET all workouts
  .get(function(req, res) {
    if (!req.user) {
      res.status(401);
      res.send('Error: unauthorized user');
      return;
    }
    mongoose.model('Workout').find({ 'user': req.user.username }, null, { sort: '-date'}, function (err, workouts) {
      if (err) {
        res.status(500);
        res.send('GET Error: There was a problem retrieiving: ' + err);
        return;
      }
      res.json(workouts);
    });
  })

  // POST a new workout
  .post(function(req, res) {
    if (!req.user) {
      res.status(401);
      res.send('Error: unauthorized user');
      return;
    }
    mongoose.model('Workout').create( {
      user: req.user.username,
      date: req.body.date,
      exercise: req.body.exercise,
      weight: req.body.weight,
      sets: req.body.sets,
      reps: req.body.reps
    },
    function (err, workout) {
      if (err) {
        res.status(500);
        res.send('POST Error: There was a problem creating: ' + err);
        return;
      }
      res.json(workout);
    })
  });

// route middleware to validate id
router.param('id', function(req, res, next, id) {
  mongoose.model('Workout').findById(id, function(err, workout) {
    // respond with 404 if workout isn't found
    if (err) {
      console.error(id + ' was not found');
      res.status(404);
      var err = new Error('Not Found');
      err.status = 404;
      res.json({ message : err.status + ' ' + err });
    }
    else {
      // once item is validated, save it in request
      req.id = id;
      next();
    }
  });
});

router.route('/:id')
  // GET individual workout
  .get(function(req, res) {
    mongoose.model('Workout').findById(req.id, function(err, workout) {
      if (err) {
        res.status(400);
        res.send('GET Error: There was a problem retrieving: ' + err);
        return;
      }
      res.json(workout);
    });
  });

// PUT to update workout
router.put('/:id', function(req, res) {
  if (!req.user) {
    res.status(401);
    res.send('Error: unauthorized user');
    return;
  }  
  // find workout by ID and update
  mongoose.model('Workout').findById(req.id, function (err, workout) {
    if (err) {
      res.status(400);
      res.send('PUT Error: There was a problem updating: ' + err);
      return;
    }
    
    workout.user = req.user.username;
    workout.date = req.body.date;
    workout.exercise = req.body.exercise;
    workout.weight = req.body.weight;
    workout.sets = req.body.sets;
    workout.reps = req.body.reps;

    workout.save(function (err) {
      if (err) {
        res.status(500);
        res.send('PUT Error: There was a problem updating: ' + err);
        return;
      }
      res.json(workout);
    });
  });
});

// DELETE a workout by ID
router.delete('/:id', function (req, res) {
  mongoose.model('Workout').findById(req.id, function(err, workout) {
    if (err) {
      res.status(400);
      res.send('DELETE Error: There was a problem deleting: ' + err);
      return;
    }
    workout.remove( function(err, workout) {
      if (err) {
        res.status(500);
        res.send('DELETE Error: There was a problem deleting: ' + err);
        return;
      }
      res.json({
        message: 'deleted',
        item: workout
      });
    });
  });
});

module.exports = router;
