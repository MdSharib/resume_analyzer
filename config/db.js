import mongoose from "mongoose";
import dotenv from "dotenv";



const connectDB = async () => {
  // error handling 
  try {
    // connecting to mongo db
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`);
  }
};

export default connectDB;
