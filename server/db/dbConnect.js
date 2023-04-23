// import the necessary modules
const mongoose = require("mongoose");
require("dotenv").config(); // loads environment variables from a .env file

async function dbConnect() {
  // connect to the database using mongoose and the DB_URL from the .env file
  mongoose
    .connect(process.env.DB_URL, {
      // set options to ensure proper connection
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!"); // print success message if connection is successful
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!"); // print error message if connection fails
      console.error(error); // log the error for debugging purposes
    });
}

// export the function to be used in other parts of the application
module.exports = dbConnect;
