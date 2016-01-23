const mongoose = require('mongoose');

var workoutSchema = new mongoose.Schema({
  user: String,
  date: Date,
  exercise: String,
  weight: Number,
  sets: Number,
  reps: Number
});

mongoose.model('Workout', workoutSchema);
