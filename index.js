var express = require('express');
var path = require('path');
var app = express();
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');


require('./api/models/db');
require('./api/models/users');
require('./api/config/passport');

var routeApi = require('./api/routes/index');

app.use(express.static(path.join(__dirname, 'api')));
app.use(passport.initialize());
app.use('/api', routeApi);
app.use(bodyParser.json());
app.use(cookieParser());



app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401);
    res.json({"message" : err.name + ": " + err.message});
  }
});

app.listen(8080, () => {
    console.log(`Listening to port 8080`);
})