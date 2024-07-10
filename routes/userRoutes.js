import express from "express"; // Importing Express framework
import passport from "passport"; // Importing Passport for authentication
import UserController from "../controllers/userControllers.js"; // Importing UserController to handle user-related operations

const userControllers = new UserController(); // Creating an instance of UserController to handle user operations
const router = express.Router(); // Creating an instance of Express router

// GET requests
router.get("/signup", userControllers.signup);
// Route: GET /signup
// Handler: userControllers.signup - Renders the signup page for user registration

router.get("/signin", userControllers.signin);
// Route: GET /signin
// Handler: userControllers.signin - Renders the signin page for user login

router.get("/signout", passport.checkAuthentication, userControllers.signout);
// Route: GET /signout
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: userControllers.signout - Logs out the user and redirects to the signin page

router.get(
  "/download-csv",
  passport.checkAuthentication,
  userControllers.downloadCsv
);
// Route: GET /download-csv
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: userControllers.downloadCsv - Downloads a CSV report containing student data

// POST request
router.post("/create", userControllers.createUser);
// Route: POST /create
// Handler: userControllers.createUser - Handles user registration when form data is posted

router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }),
  userControllers.createSession
);
// Route: POST /create-session
// Middleware: passport.authenticate('local', { failureRedirect: '/users/signin' }) - Uses local authentication strategy with Passport
// Handler: userControllers.createSession - Creates a user session upon successful login

export default router; // Exporting the router instance for use in other parts of the application
