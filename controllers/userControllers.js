import User from "../models/userSchema.js"; // Import User model/schema
import Student from "../models/studentSchema.js"; // Import Student model/schema
import fs from "fs"; // Import Node.js file system module
import fastcsv from "fast-csv"; // Import fast-csv for CSV processing

export default class UserController {
  // Render Signup page
  signup(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("back"); // Redirect back if user is already authenticated
    }
    res.render("signup"); // Render 'signup' view if user is not authenticated
  }

  // Render Signin page
  signin(req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("back"); // Redirect back if user is already authenticated
    }
    res.render("signin"); // Render 'signin' view if user is not authenticated
  }

  // create session
  createSession(req, res) {
    console.log("Session created successfully");
    return res.redirect("/"); // Redirect to home page after creating session
  }

  // signout
  signout(req, res) {
    req.logout(function (err) {
      // Logout user
      if (err) {
        return next(err); // Handle error if logout fails
      }
    });
    return res.redirect("/users/signin"); // Redirect to signin page after logout
  }

  // create user
  async createUser(req, res) {
    const { name, email, password, confirmPassword } = req.body; // Extract user details from request body
    try {
      if (password !== confirmPassword) {
        console.log(`Passwords don't match`);
        return res.redirect("back"); // Redirect back if passwords don't match
      }
      const user = await User.findOne({ email }); // Check if user with the same email already exists

      if (user) {
        console.log(`Email already exists`);
        return res.redirect("back"); // Redirect back if email already exists
      }

      const newUser = await User.create({
        name,
        email,
        password,
      });

      await newUser.save(); // Save new user to database

      if (!newUser) {
        console.log(`Error in creating user`);
        return res.redirect("back"); // Redirect back if user creation fails
      }

      return res.redirect("/users/signin"); // Redirect to signin page after successful user creation
    } catch (error) {
      console.log(`Error in creating user: ${error}`);
      res.redirect("back"); // Redirect back if there's an error
    }
  }

  // download report in csv format
  async downloadCsv(req, res) {
    try {
      const students = await Student.find({}); // Fetch all students from database

      let data = "";
      let no = 1;
      let csv =
        "S.No, Name, Email, College, Placemnt, Contact Number, Batch, DSA Score, WebDev Score, React Score, Interview, Date, Result";

      for (let student of students) {
        data =
          no +
          "," +
          student.name +
          "," +
          student.email +
          "," +
          student.college +
          "," +
          student.placement +
          "," +
          student.contactNumber +
          "," +
          student.batch +
          "," +
          student.dsa +
          "," +
          student.webd +
          "," +
          student.react;

        if (student.interviews.length > 0) {
          for (let interview of student.interviews) {
            data +=
              "," +
              interview.company +
              "," +
              interview.date.toString() +
              "," +
              interview.result;
          }
        }
        no++;
        csv += "\n" + data;
      }

      // Write CSV data to file
      const dataFile = fs.writeFile(
        "report/data.csv",
        csv,
        function (error, data) {
          if (error) {
            console.log(error);
            return res.redirect("back"); // Redirect back if there's an error writing file
          }
          console.log("Report generated successfully");
          return res.download("report/data.csv"); // Download CSV file
        }
      );
    } catch (error) {
      console.log(`Error in downloading file: ${error}`);
      return res.redirect("back"); // Redirect back if there's an error
    }
  }
}
