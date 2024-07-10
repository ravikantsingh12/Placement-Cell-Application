import express from "express"; // Importing Express.js framework
import dotenv from "dotenv"; // Importing dotenv for environment variables
import path from "path"; // Importing path module for file path operations

// setting dotenv for system-specific environment variables from .env file
dotenv.config({ path: path.resolve("config/.env") });

import mongoose from "mongoose"; // Importing Mongoose for MongoDB object modeling
import session from "express-session"; // Importing express-session for session management
import passport from "passport"; // Importing passport for authentication
import ejsLayouts from "express-ejs-layouts"; // Importing express-ejs-layouts for EJS layouts

import passportLocal from "./config/passport-local-strategy.js"; // Importing local passport strategy for authentication
import router from "./routes/index.js"; // Importing application routes
import db from "./config/mongoose.js"; // Importing Mongoose database configuration

const port = process.env.PORT || 8000; // Default port is set to 8000 if PORT environment variable is not set

// Create an Express application
const app = express();

// Set EJS as the view engine and configure views directory
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(ejsLayouts); // Use express-ejs-layouts for layout support

// Configure session middleware
app.use(
  session({
    secret: "secret", // Secret for session encryption
    resave: false, // Don't save session if unmodified
    saveUninitialized: false, // Don't create session until something is stored
    cookie: { maxAge: 24 * 60 * 60 * 1000 }, // Cookie lifespan: 1 day (24 hours)
  })
);

// Serve static files from the 'public' directory
app.use(express.static(path.join(path.resolve(), "public")));

// Parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

// Initialize Passport and session management
app.use(passport.initialize());
app.use(passport.session());

// Custom middleware to set authenticated user in views
app.use(passport.setAuthenticatedUser);

// Use application routes defined in ./routes/index.js
app.use("/", router);

// Start the server and listen on specified port
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in connecting to server: ${error}`);
    return;
  }
  //  Logging when successfully running the port
  console.log(`Server running on port: ${port}`);
});
