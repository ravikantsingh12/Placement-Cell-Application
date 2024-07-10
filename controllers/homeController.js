import Student from "../models/studentSchema.js"; // Import Student model/schema

// Define HomeController class to handle rendering home page and loading student details
export default class HomeController {
  // Async method to render home page and load students details
  async homePage(req, res) {
    try {
      const students = await Student.find({}); // Fetch all students from the database
      return res.render("home", { students }); // Render 'home' view with students data
    } catch (error) {
      return res.status(500).send("An error occurred while fetching students."); // Handle error if fetching students fails
    }
  }
}
