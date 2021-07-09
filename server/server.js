const express = require('express');
var app = express();
var bodyParser = require('body-parser')
const path = require('path');
const { SERVER_PORT } = require('./utils/constants');
const requestLogger = require('./middleware/requestLogger');


process
  .on('unhandledRejection', (reason, p) => {
    console.error(`${reason} Unhandled Rejection at Promise${p}`);
  })
  .on('uncaughtException', err => {
    // also logging if any unhandled exception occurred
    console.error(`Unhandled error occurred ${err}`);
  });

// configuring authentication middleware
//passportMiddleware(passport);
// adding authentication middleware in pipeline
//app.use(passport.initialize());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(requestLogger);
require('./controller/TaskController')(app);

app.get('/api/taskManager',(req, res) => res.send("it's working"));

app.use(express.static(path.join(path.resolve('../client/build'))))
//TODO: dummy response. Should be replaced when client side will be initiated
app.get('*', (req, res) => {
  res.sendFile(path.join(path.resolve('../client/build/index.html')));
});

const server = app.listen( SERVER_PORT, () => {
  console.log( `Server running on port ${SERVER_PORT} DateTime:${new Date()}`);
});

module.exports = server;