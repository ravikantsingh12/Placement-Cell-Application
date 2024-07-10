import Student from "../models/studentSchema.js"; // Import Student model/schema
import Company from "../models/companySchema.js"; // Import Company model/schema

export default class CompanyController {
  // Render company page
  async companyPage(req, res) {
    try {
      const students = await Student.find({}); // Fetch all students from database
      return res.render("company", { students }); // Render 'company' view with students data
    } catch (error) {
      console.log(`Error in rendering page: ${error}`); // Log error if rendering fails
      return res.redirect("back"); // Redirect back if there's an error
    }
  }

  // Allocate interview
  async allocateInterview(req, res) {
    try {
      const students = await Student.find({}); // Fetch all students from database

      let array = [];

      for (let student of students) {
        array.push(student.batch); // Collect all batches into 'array'
      }
      // Filter out duplicate batches using Set
      array = [...new Set(array)];

      return res.render("allocateInterview", { students, array }); // Render 'allocateInterview' view with students and array data
    } catch (error) {
      console.log(`Error in allocating interview: ${error}`); // Log error if allocation fails
      return res.redirect("back"); // Redirect back if there's an error
    }
  }

  // Schedule interview
  async scheduleInterview(req, res) {
    const { id, company, date } = req.body; // Extract id, company name, and date from request body
    try {
      const existingCompany = await Company.findOne({ name: company }); // Check if company already exists

      const obj = {
        student: id,
        date,
        result: "Pending",
      };

      if (!existingCompany) {
        // Create new company if it doesn't exist
        const newCompany = await Company.create({
          name: company,
        });
        newCompany.students.push(obj); // Add student and interview details to new company
        newCompany.save(); // Save new company to database
      } else {
        // Check if student's interview with this company already exists
        for (let student of existingCompany.students) {
          if (student.student._id === id) {
            console.log("Interview with this student already scheduled");
            return res.redirect("back");
          }
        }
        existingCompany.students.push(obj); // Add student and interview details to existing company
        existingCompany.save(); // Save existing company to database
      }

      const student = await Student.findById(id); // Find student by id

      if (student) {
        const interview = {
          company,
          date,
          result: "Pending",
        };
        student.interviews.push(interview); // Add interview details to student's interviews array
        student.save(); // Save student to database
      }
      console.log("Interview Scheduled Successfully"); // Log success message
      return res.redirect("/company/home"); // Redirect to company home page
    } catch (error) {
      console.log(`Error in scheduling Interview: ${error}`); // Log error if scheduling fails
      return res.redirect("back"); // Redirect back if there's an error
    }
  }

  // Update status of interview
  async updateStatus(req, res) {
    const { id } = req.params; // Extract student id from request parameters
    const { companyName, companyResult } = req.body; // Extract company name and result from request body
    try {
      const student = await Student.findById(id); // Find student by id

      if (student && student.interviews.length > 0) {
        for (let company of student.interviews) {
          if (company.company === companyName) {
            company.result = companyResult; // Update interview result for student
            student.save(); // Save student to update changes
            break;
          }
        }
      }

      const company = await Company.findOne({ name: companyName }); // Find company by name

      if (company) {
        for (let std of company.students) {
          if (std.student.toString() === id) {
            std.result = companyResult; // Update interview result for company
            company.save(); // Save company to update changes
          }
        }
      }
      console.log("Interview Status Changed Successfully"); // Log success message
      return res.redirect("back"); // Redirect back
    } catch (error) {
      console.log(`Error in updating status: ${error}`); // Log error if status update fails
      res.redirect("back"); // Redirect back if there's an error
    }
  }
}
