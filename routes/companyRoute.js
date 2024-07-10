import express from "express";
import passport from "passport";
import CompanyController from "../controllers/companyController.js";

const router = express.Router(); // Create an Express router instance
const companyController = new CompanyController(); // Create an instance of CompanyController to handle route callbacks

// GET requests
router.get(
  "/home",
  passport.checkAuthentication,
  companyController.companyPage
);
// Route: GET /home
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: companyController.companyPage - Renders company page

router.get(
  "/allocate",
  passport.checkAuthentication,
  companyController.allocateInterview
);
// Route: GET /allocate
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: companyController.allocateInterview - Renders allocation interview page

// POST requests
router.post(
  "/schedule-interview",
  passport.checkAuthentication,
  companyController.scheduleInterview
);
// Route: POST /schedule-interview
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: companyController.scheduleInterview - Handles scheduling interview logic

router.post(
  "/update-status/:id",
  passport.checkAuthentication,
  companyController.updateStatus
);
// Route: POST /update-status/:id
// Middleware: passport.checkAuthentication - Ensures user is authenticated
// Handler: companyController.updateStatus - Handles updating interview status logic

export default router; // Export the router to be used in other parts of the application
