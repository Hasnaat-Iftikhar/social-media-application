import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.NEXT_PUBLIC_MONGODB_URL)
    return console.log("'MONGODB_URL' not found in .env file");

  if (isConnected) return console.log("MongoDB connection already established");

  try {
    await mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL);

    isConnected = true;
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error);
  }
};
