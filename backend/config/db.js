import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("MONGO DB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
    //console.error(error);
    //console.error(error.stack);
    //console.error("Login failed:", error.message);
    //console.log("Error occurred:", error.message);
    //console.error(`Error: ${error.message}`);
    //console.error(`${error.name}: ${error.message}`);
  }
};

export default connectDB;
