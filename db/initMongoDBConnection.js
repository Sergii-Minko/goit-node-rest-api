import mongoose from "mongoose";
// import 'dotenv/config';

// import env from '../utils/env.js';

const initMongoDBConnection = async () => {
  try {
    // const user = env('MONGODB_USER');
    // const password = env('MONGODB_PASSWORD');
    // const url = env('MONGODB_URL');
    // const name = env('MONGODB_NAME');
    // const DB_HOST = `mongodb+srv://${user}:${password}@${url}/${name}?retryWrites=true&w=majority&appName=ClusterGoit
    const DB_HOST = `mongodb+srv://Goit:hFhyq0PUyppEjt5i@clustergoit.m9yciu2.mongodb.net/db-contacts?retryWrites=true&w=majority&appName=ClusterGoit`;
    await mongoose.connect(DB_HOST);
    console.log("Succsessfully connection to MongoDB");
  } catch (error) {
    console.log(`Connection error ${error.message}`);
    throw error;
  }
};

export default initMongoDBConnection;
