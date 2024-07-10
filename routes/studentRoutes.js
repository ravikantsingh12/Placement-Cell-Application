import express from "express"; // Importing Express framework
import passport from "../config/passport-local-strategy.js"; // Importing Passport configuration
import StudentController from "../controllers/studentController.js"; // Importing StudentController to handle student operations

const router = express.Router(); // Creating an instance of Express router

const studentController = new StudentController(); // Creating an instance of StudentController to handle student-related routes

// GET requests
router.get(
  "/create",
  passport.checkAuthentication,
  studentController.createStudentPage
);
// Route: GET /create
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: studentController.createStudentPage - Renders the page for creating a new student

router.get(
  "/delete/:id",
  passport.checkAuthentication,
  studentController.deleteStudent
);
// Route: GET /delete/:id
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: studentController.deleteStudent - Handles deleting a student identified by :id

// POST requests
router.post(
  "/create-student",
  passport.checkAuthentication,
  studentController.createStudent
);
// Route: POST /create-student
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: studentController.createStudent - Handles creating a new student when form data is posted

export default router; // Exporting the router instance for use in other parts of the application
