# stamina

### Description
Stamina is a simple web application for logging workouts. It consists of an Angular single-page application that consumes an Express API. The API connects with a MongoDB to create, read, update, and delete workouts.

### Link
Try it out [here](http://stamina-logger.herokuapp.com). *Disclaimer: This application is a toy project and still under heavy development.*

### Contributing
To start hacking as is, you'll need Node.js installed on your machine and access to a Mongo database. Issues and pull requests are welcome.

### Getting Started
1. `git clone` this repository or download it as an archive.
2. Go to the `stamina` directory in your terminal. Install dependencies. `npm install`
3. Create an environment variable `$MONGOLAB_URI` to connect to your dev database.
4. Back in the `stamina` directory, start the Node server. `npm start`
5. Or, if you have nodemon installed (`npm install -g nodemon`) and want live reload. `npm run-script watch`
6. In your browser, view the app at [localhost:3000](http://localhost:3000)

### Testing
1. Make sure you have mocha installed. `npm install -g mocha`
2. Set two environment variables, `$STAMINA_ID` and `$STAMINA_KEY`, corresponding to an account suitable for testing purposes.
3. Run `npm test` from the project root directory.
4. For coverage reporting, install istanbul (`npm install -g istanbul`) and run `istanbul cover _mocha`

### Structure Overview
* `model/` -> database model / schema
* `public/` -> frontend files (css, js, etc.)
* `routes/` -> REST routes for the API
* `views/` -> Jade templates
* `bin/` -> contains the express-generated startup script (www)
* `sass/` -> sass files to be compiled
* `test/` -> unit tests for the API

### Screenshot
![View](screenshot.png?raw=true)
