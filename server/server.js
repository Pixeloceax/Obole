const express = require('express');
const app = express();
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';
const dbName = 'bank';

app.get('/clients', function(req, res) {
MongoClient.connect(url, function(err, client) {
const db = client.db(dbName);
const collection = db.collection('clients');
collection.find({}).toArray(function(err, docs) {
  if (err) {
    console.log(err);
    client.close();
    res.status(500).send('Error retrieving data');
  } else {
    res.send(docs);
    client.close();
  }
});
});
});

app.listen(3001, function() {
console.log('Server listening on port 3001');
});