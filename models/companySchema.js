// Import mongoose library
import mongoose from "mongoose";

const companySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true, // Ensures each company name is unique
    },
    students: [
      {
        student: {
          type: mongoose.Schema.Types.ObjectId, // Reference to Student model
          ref: "Student", // Refers to the 'Student' model
        },
        date: {
          type: Date,
          required: true, // Date of the interview is required
        },
        result: {
          type: String,
          enum: [
            "On Hold",
            "Selected",
            "Pending",
            "Not Selected",
            "Did not Attempt",
          ], // Possible interview result options
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

const Company = mongoose.model("Company", companySchema); // Create 'Company' model based on companySchema

export default Company; // Export Company model
