require('dotenv').config()
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let crypto = require('crypto');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const signature = require('./routes/signature');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signature', signature);





app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}));

module.exports = app;
