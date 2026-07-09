import mongoose from "mongoose";
import { ENV } from "./env.config.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(ENV.MONGO_URI);

    console.log("mongodb Connected!");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
