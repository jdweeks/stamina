var mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
  date: Date,
  exercise: String,
  weight: Number,
  sets: Number,
  reps: Number
});

mongoose.model('Workout', workoutSchema);
