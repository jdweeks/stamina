# stamina
A simple CRUD app for logging training sessions.

### Description
Stamina is a simple web application designed for logging workouts. It consists of an AngularJS single-page application that consumes a self-written Express RESTful API. The API interfaces with a MongoDB to create, read, update, and delete workouts.

[Screenshot](/img/view.png)

### Contributing
All development for this project has been done locally up to this juncture. The API connects to a local Mongo database, and the API itself and the Angular application are both hosted locally. To start hacking as is, you'll need MongoDB, Node.js, and Express installed on your machine. Pull requests are welcome. 

### Getting started
1. Go to the `stamina` directory in your terminal. Install dependencies. `npm install`
2. Open a new terminal window, start mongod. `mongod`
3. Open a new terminal window, start the database. `mongo stamina_db`
4. Back in the `stamina` directory, start the Node server. `npm start`
5. In your browser, navigate to http://localhost:3000

Note: Terminal multiplexers such as tmux can make local development easier in this regard. 
[Screenshot](/img/tmux.png)
