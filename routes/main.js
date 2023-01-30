var express = require('express');
var router = express.Router();


//Mongo DB Execute Get
console.log("Main: Tyring to connect the server...");
const { MongoClient, ServerApiVersion } = require("mongodb");

const username = encodeURIComponent("jin");
const password = encodeURIComponent("jinpw");
const cluster = "jinscluster";

// Connection URI
const uri =
  `mongodb+srv://${username}:${password}@${cluster}.m8dzjxd.mongodb.net/?retryWrites=true&w=majority`;
  
// Create a new MongoClient
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

let output_posts = [];

async function run() {
  try {
    // Connect the client to the server (optional starting in v4.7)
    const database = client.db('mydb');
    await database.command({ ping: 1 });
    console.log("Main: Connected successfully to server");
    const posts_collection = database.collection('posts');
    const postID = "p0001";

    output_posts = await posts_collection.find( {} ).toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

/* Get Posts */
run().catch(console.dir);
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home/main', { posts: output_posts });
});
module.exports = router;
