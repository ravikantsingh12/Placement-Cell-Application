import Company from "../models/companySchema.js"; // Import Company model/schema
import Student from "../models/studentSchema.js"; // Import Student model/schema

export default class StudentController {
  // Rendering add student page
  createStudentPage(req, res) {
    return res.render("add_student"); // Render 'add_student' view for adding a new student
  }

  // Method to create student
  async createStudent(req, res) {
    const {
      name,
      email,
      batch,
      college,
      placement,
      contactNumber,
      dsa,
      webd,
      react,
    } = req.body; // Extract student details from request body
    try {
      const student = await Student.findOne({ email }); // Check if student with the same email already exists

      if (student) {
        console.log("Email already exists");
        return res.redirect("back"); // Redirect back if student with the same email exists
      }

      // Create a new student object using Student model and save to database
      const newStudent = await Student.create({
        name,
        email,
        college,
        batch,
        placement,
        contactNumber,
        dsa,
        webd,
        react,
      });
      await newStudent.save(); // Save the new student object to database

      return res.redirect("/"); // Redirect to home page after successful creation
    } catch (error) {
      console.log(`Error in creating student: ${error}`); // Log error if student creation fails
      return res.redirect("back"); // Redirect back if there's an error
    }
  }

  // Delete student
  async deleteStudent(req, res) {
    const { id } = req.params; // Extract student id from request parameters
    try {
      const student = await Student.findById(id); // Find student by id

      if (student && student.interviews.length > 0) {
        for (let item of student.interviews) {
          const company = await Company.findOne({ name: item.company }); // Find company for each interview

          if (company) {
            for (let i = 0; i < company.students.length; i++) {
              if (company.students[i].student.toString() === id) {
                company.students.splice(i, 1); // Remove student from company's students list
                await company.save(); // Save company to update changes
                break;
              }
            }
          }
        }
      }

      await Student.findByIdAndDelete(id); // Delete student from database
      res.redirect("back"); // Redirect back after successful deletion
    } catch (error) {
      console.log("Error in deleting student", error); // Log error if deletion fails
      return res.redirect("back"); // Redirect back if there's an error
    }
  }
}
