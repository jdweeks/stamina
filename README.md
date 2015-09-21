# stamina
A simple CRUD app for logging training sessions.

### Description
Stamina is a simple web application designed for logging workouts. It consists of an AngularJS single-page application that consumes a self-written Express RESTful API. The API interfaces with a MongoDB to create, read, update, and delete workouts.

### Contributing
All development for this project has been done locally up to this juncture. The API connects to a local Mongo database, and the API itself and the Angular application are both hosted locally. To start hacking as is, you'll need MongoDB and Node.js installed on your machine. Issues and pull requests are welcome. 

### Getting started
1. Go to the `stamina` directory in your terminal. Install dependencies. `npm install`
2. Open a new terminal window, start the mongo daemon. `mongod`
3. Back in the `stamina` directory, start the Node server. `npm start`
4. In your browser, navigate to http://localhost:3000

Note: Terminal multiplexers such as tmux can make local development easier in this regard. 

### Structure Overview
* /model -> files relevant to the database model and schema
* /public -> frontend files; core.js contains the angular app's controller
* /routes -> index.js contains routing for the frontend; workouts.js routes REST calls to the API
* /views -> Jade templates; index.jade contains the view for the angular app
* /bin -> contains the express-generated startup script (www)

### Screenshot
[View](screenshot.png?raw=true)
