const express = require("express");
const router = express.Router();
const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://obole:1YUM76QQgyYnfcbc@obole.dqfi0yz.mongodb.net/bank?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

router.get("/", (req, res) => {
  client.connect((err) => {
    const collection = client.db("bank").collection("clients");
    collection.find({}).toArray((err, docs) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error retrieving clients");
      } else {
        res.send(docs);
      }
      client.close();
    });
  });
});

module.exports = router;
