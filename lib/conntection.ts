import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set("strictQuery", false);
    const { connection } = await mongoose.connect(process.env.MONGO_URI!);

    return Promise.resolve(true);
  } catch (error) {
    console.log("error", error);
    return Promise.reject(error);
  }
};

export default connectDB;
