require('dotenv').config()
const {startRedis} = require('./helpers/connections_redis');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const signature = require('./routes/signature');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./Schemas/index');
const redisApp = require('./routes/redis');

var app = express();
startRedis();

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

//redis
app.use('/pokemon', redisApp);




module.exports = app;
