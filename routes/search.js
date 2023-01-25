const express = require('express');
const router = express.Router();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';
// Database name
const dbName = 'myproject';

const client = new MongoClient(url);

(async function() {
  try {
    await client.connect();
    console.log("Connected correctly to server");
    const db = client.db(dbName);

    // Get the updates collection
    const col = db.collection('updates');
    // Insert multiple documents
    let r = await col.insertMany([{a:1}, {a:2}, {a:2}]);
    assert.equal(3, r.insertedCount);

    // Update a single document
    r = await col.updateOne({a:1}, {$set: {b: 1}});
    assert.equal(1, r.matchedCount);
    assert.equal(1, r.modifiedCount);

    // Update multiple documents
    r = await col.updateMany({a:2}, {$set: {b: 1}});
    assert.equal(2, r.matchedCount);
    assert.equal(2, r.modifiedCount);

    // Upsert a single document
    r = await col.updateOne({a:3}, {$set: {b: 1}}, {
      upsert: true
    });
    assert.equal(0, r.matchedCount);
    assert.equal(1, r.upsertedCount);

    // Close connection
    client.close();
  } catch(err) {
    console.log(err.stack);
  }
})();

const post_doc = {}
/* GET search page. */
router.get('/', function(req, res, next) {
  res.render('search/search', { posts: post_doc });
});

module.exports = router;