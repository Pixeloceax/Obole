const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());

const uri =
  "mongodb+srv://obole:1YUM76QQgyYnfcbc@obole.dqfi0yz.mongodb.net/bank?retryWrites=true&w=majority";

async function connect() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("Error connecting to MongoDB", err);
  }
}

connect();

const clientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address: {
    street: String,
    city: String,
    postal_code: String,
  },
  phone: String,
  email: String,
});

const Client = mongoose.model("Client", clientSchema);

app.get("/api/clients", async (req, res) => {
  try {
    const clients = await Client.find();
    res.json(clients);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
