import mongoose from "mongoose";

const connect = async () => {
  if (mongoose.connections[0].readyState) return;

  try {
    await mongoose.connect(process.env.MONGO_URL, {});
    console.log("MongoDB connection successfully established.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw new Error("Error connecting to MongoDB");
  }
};

export default connect;
