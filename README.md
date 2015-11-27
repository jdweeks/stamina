# stamina

### Description
Stamina is a simple web application for logging workouts. It consists of an Angular single-page application that consumes an Express RESTful API. The API connects to a MongoDB to create, read, update, and delete workouts.

### Contributing
All development for this project has been done locally up to this juncture. The API is hosted locally and connects to a local Mongo database. To start hacking as is, you'll need MongoDB and Node.js installed on your machine. Issues and pull requests are welcome. 

### Getting Started
1. `git clone` this repository or download it as an archive.
2. Go to the `stamina-master` directory in your terminal. Install dependencies. `npm install`
3. On Linux: Start the mongo daemon in the background. `sudo service mongod start`     
   On OSX: Start the mongo daemon in the background. `mongod &`
4. Back in the `stamina-master` directory, start the Node server. `npm start`
5. In your browser, navigate to localhost:3000
 
### Structure Overview
* `/model` -> files relevant to the database model and schema
* `/public` -> frontend files; core.js contains the angular app's controller
* `/routes` -> index.js routes to the frontend app; workouts.js routes REST calls to the API
* `/views` -> Jade templates; index.jade contains the view for the angular app
* `/bin` -> contains the express-generated startup script (www)
