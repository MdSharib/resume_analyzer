import mongoose from "mongoose";




const connectDB = async () => {
  // error handling while connecting to db
  try {
    // connecting to mongo db
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Conneted To Mongodb Databse ${conn.connection.host}`
    );
  } catch (error) {
    console.log(`Errro in Mongodb ${error}`.bgRed.white);
  }
};

export default connectDB;
