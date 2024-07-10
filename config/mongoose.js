// Import necessary modules
import mongoose from "mongoose"; // Import mongoose for MongoDB interactions
import dotenv from "dotenv"; // Import dotenv to load environment variables
import path from "path"; // Import path for resolving file paths

// Load environment variables from .env file located in 'config' directory
dotenv.config({ path: path.resolve("config/.env") });

// Handle Mongoose deprecation warning for `strictQuery`
mongoose.set("strictQuery", false);

// Connect to the MongoDB database using the environment variable or local database as a fallback
const mongoURI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/placement_cell";

// Log the MongoDB URI to the console for debugging and information
console.log("MongoDB URI:", mongoURI);

// Throw an error if the MongoDB URI is not defined
if (!mongoURI) {
  throw new Error("The MongoDB URI is not defined.");
}

// Connect to MongoDB using mongoose
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection; // Get the default mongoose connection

// Event listener for MongoDB connection error
db.on("error", console.error.bind(console, "Error in connecting to MongoDB"));

// Event listener for successful MongoDB connection
db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

export default mongoose; // Export mongoose instance to be used throughout the application
