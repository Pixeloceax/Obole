import mongoose from "mongoose";

async function dbConnect() {
  try {
    await mongoose.connect(
      process.env.MONGODB_URI ||
        "mongodb+srv://obole:1YUM76QQgyYnfcbc@obole.dqfi0yz.mongodb.net/authDB?retryWrites=true&w=majority"
    );
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.log("Unable to connect to MongoDB Atlas!");
    console.error(error);
  }
}

export default dbConnect;
