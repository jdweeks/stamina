const request = require('supertest');
const app = require('../app');
const server = request.agent(app);

describe('GET /api/workouts', function() {
  it('respond unauthorized', function(done) {
    server
      .get('/api/workouts')
      .expect(401, done)
  });
  it('login', login());
  it('respond OK', function(done) {
    server
      .get('/api/workouts')
      .expect(200, done)
  });
});

describe('GET /api/volume', function() {
  it('logout', logout());
  it('respond unauthorized', function(done) {
    server
      .get('/api/volume')
      .expect(401, done)
  });
  it('login', login());
  it('respond OK', function(done) {
    server
      .get('/api/volume?name=Squat')
      .expect(200, done)
  });
});

describe('GET /api/records', function() {
  it('logout', logout());
  it('respond unauthorized', function(done) {
    server
      .get('/api/records')
      .expect(401, done)
  });
  it('login', login());
  it('respond OK', function(done) {
    server
      .get('/api/records?name=Squat')
      .expect(200, done)
  });
  it('logout', logout());
});

describe('create, read, update, delete', function() {
  var workout = {};
  it('login', login());
  it('create', function(done) {
    server
      .post('/api/workouts')
      .send({
        date: new Date(),
        exercise: 'Squat',
        weight: 225,
        sets: 5,
        reps: 5
      })
      .expect(function(res) {
        workout = res.body;
      })
      .expect(200, done)
  });
  it('read', function(done) {
    server
      .get('/api/workouts/' + workout._id)
      .expect(200, done)
  });
  it('update', function(done) {
    server
      .put('/api/workouts/' + workout._id)
      .send({
        date: new Date(),
        exercise: workout.exercise,
        weight: workout.weight,
        sets: workout.sets,
        reps: workout.reps,
      })
      .expect(200, done)
  });
  it('delete', function(done) {
    server
      .delete('/api/workouts/' + workout._id)
      .expect(200, done)
  });
  it('logout', logout());
});

describe('POST /api/contact', function() {
  it('respond OK', function(done) {
    server
      .post('/api/contact')
      .send({ email: 'jdweeks@clemson.edu', reason: 'TEST', msg: 'This is a test.' })
      .expect(200, done)
  });
});

function login() {
  return function(done) {
    server
      .post('/login')
      .send({ username: process.env.STAMINA_ID, password: process.env.STAMINA_KEY })
      .expect(302)
      .expect('Location', '/')
      .end(function(err, res) {
        if (err) return done(err);
        return done(); 
      });
  };
};

function logout() {
  return function(done) {
    server
      .get('/logout')
      .expect(302)
      .expect('Location', '/')
      .end(function(err, res) {
        if (err) return done(err);
        return done(); 
      });
  };
};
