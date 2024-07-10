import express from "express"; // Importing Express framework
import passport from "passport"; // Importing Passport for authentication
import HomeController from "../controllers/homeController.js"; // Importing HomeController to handle home page logic
import studentRoutes from "./studentRoutes.js"; // Importing student routes from studentRoute.js
import userRoutes from "./userRoutes.js"; // Importing user routes from userRoutes.js
import companyRoutes from "./companyRoute.js"; // Importing company routes from companyRoute.js

const router = express.Router(); // Creating an instance of Express router
const homeController = new HomeController(); // Creating an instance of HomeController to handle home page logic

// Route for the home page
router.get("/", passport.checkAuthentication, homeController.homePage);
// Route: GET /
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: homeController.homePage - Renders the home page

// Mounting sub-routers
router.use("/students", studentRoutes); // Mounting student routes under /students
router.use("/company", companyRoutes); // Mounting company routes under /company
router.use("/users", userRoutes); // Mounting user routes under /users

export default router; // Exporting the router instance
