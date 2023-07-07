import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Connected to database host : ${conn.connection.host}`);
  } catch (error) {
    console.log(`Connection Errpr : ${error}`);
  }
};

export default connectDB;
