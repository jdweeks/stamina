# stamina

### Description
Stamina is a simple web application for logging workouts. It consists of an Angular single-page application that consumes an Express API. The API connects with a MongoDB to create, read, update, and delete workouts.

### Link
Try it out [here](http://stamina-logger.herokuapp.com). *Disclaimer: This application is a toy project and still under heavy development.*

### Contributing
To start hacking as is, you'll need Node.js (plus nodemon for live reload) installed on your machine. Issues and pull requests are welcome.

### Getting Started
1. `git clone` this repository or download it as an archive.
2. Go to the `stamina-master` directory in your terminal. Install dependencies. `npm install`
3. Create an environment variable called `MONGOLAB_URI` to connect to your development database.
4. Back in the `stamina-master` directory, start the Node server. `npm start`
5. In your browser, navigate to `localhost:3000`

### Structure Overview
* `model/` -> files relevant to the database model and schema
* `public/` -> frontend files; core.js contains the angular app's controller
* `routes/` -> index.js routes to the frontend app; workouts.js routes REST calls to the API
* `views/` -> Jade templates; index.jade contains the view for the angular app
* `bin/` -> contains the express-generated startup script (www)
* `sass/` -> sass files to be compiled to css

### Screenshot
![View](screenshot.png?raw=true)
