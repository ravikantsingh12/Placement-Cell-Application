import passport from "passport"; // Import passport for authentication
import passportLocal from "passport-local"; // Import passport-local for local strategy
import User from "../models/userSchema.js"; // Import User model/schema

const LocalStrategy = passportLocal.Strategy; // Define LocalStrategy from passport-local

// Define local strategy for authentication
const local = new LocalStrategy({ usernameField: "email" }, function (
  email,
  password,
  done
) {
  // Find user by email in database
  User.findOne({ email }, function (error, user) {
    if (error) {
      // Handle database error
      console.log(`Error in finding user: ${error}`);
      return done(error);
    }

    if (!user || !user.isPasswordCorrect(password)) {
      // If user not found or password incorrect, return false
      console.log("Invalid Username/Password");
      return done(null, false);
    }

    // If user found and password correct, return user object
    return done(null, user);
  });
});

// Use the 'local' strategy with passport
passport.use("local", local);

// Serialize user object to store in session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user object from session
passport.deserializeUser(function (id, done) {
  // Find user by ID in database
  User.findById(id, function (err, user) {
    if (err) {
      // Handle database error
      console.log("Error in finding user--> Passport");
      return done(err);
    }
    // Return user object
    return done(null, user);
  });
});

// Middleware function to check if user is authenticated
passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    // If user is authenticated, proceed to next middleware
    return next();
  }
  // If not authenticated, redirect to sign-in page
  return res.redirect("/users/signin");
};

// Middleware function to set authenticated user for views
passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    // If user is authenticated, set user object in locals for views
    res.locals.user = req.user;
  }
  next();
};

export default passport; // Export passport instance to be used throughout the application
