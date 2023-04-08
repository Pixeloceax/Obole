const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://obole:1YUM76QQgyYnfcbc@obole.dqfi0yz.mongodb.net/bank?retryWrites=true&w=majority";
const MongoClientConnection = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get("/", (req, res) => {
  MongoClientConnection.connect((err) => {
    const database = MongoClientConnection.db("bank");
    database.listCollections().toArray((err, collections) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving collections");
      } else {
        res.send(collections.map((c) => c.name));
      }
      MongoClientConnection.close();
    });
  });
});

module.exports = router;
