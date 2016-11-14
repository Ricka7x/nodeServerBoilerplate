const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const app = express();


mongoose.connect('mongodb://localhost/testing');

const index = require('./routes/index');
const auth = require('./routes/auth');

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', index);
app.use(auth);

const port = process.env.PORT || '8000';
const server = http.createServer(app);

server.listen(port, function(){
  console.log('Server Listening on port ' + port);
});
