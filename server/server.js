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

// clients schema and model definition

const clientSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  address: {
    street: String,
    city: String,
    postal_code: String,
  },
  contact: {
    phone: String,
    email: String,
  },
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

// accounts schema and model definition

const securitySchema = new mongoose.Schema({
  username: String,
  password: String,
  pin: String,
});

const Security = mongoose.model("Security", securitySchema);

app.get("/api/security", async (req, res) => {
  try {
    const security = await Security.find();
    res.json(security);
  } catch (err) {
    res.status(500).send(err);
  }
});

// audit schema and model definition

const auditSchema = new mongoose.Schema({
  user_id: String,
  action: String,
  date: Date,
  result: String,
});

const Audit = mongoose.model("Audit", auditSchema);

app.get("/api/audit", async (req, res) => {
  try {
    const audit = await Audit.find();
    res.json(audit);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(3001, () => {
  console.log("Server listening on port 3001");
});
