const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const mainRouter = require('./routes/main');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', mainRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

/***********************************************************************************************************/
//Mongo DB Execute POST
console.log("App: Tyring to connect the server...");
const { MongoClient, ServerApiVersion } = require("mongodb");

const username = encodeURIComponent("jin");
const password = encodeURIComponent("jinpw");
const cluster = "jinscluster";

// Connection URI
const uri =
  `mongodb+srv://${username}:${password}@${cluster}.m8dzjxd.mongodb.net/?retryWrites=true&w=majority`;
  
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    const database = client.db('mydb');
    await database.command({ ping: 1 });
    console.log("Connected successfully to server");

    const posts_collection = database.collection('posts');
    const doc = {post_id: "p0003", 
    user_id: "u0002", contents: 
    "How are you?", timestamp: 
    "2023-01-03", likes: 20};

    const post_result = await posts_collection.insertOne(doc);
    console.log(post_result);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

//run().catch(console.dir);

module.exports = app;
