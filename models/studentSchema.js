// Import mongoose library
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name of the student is required
    },
    email: {
      type: String,
      unique: true, // Email must be unique across all students
      required: true, // Email is required
    },
    college: {
      type: String,
      required: true, // College name is required
    },
    placement: {
      type: String,
      required: true,
      enum: ["Placed", "Not Placed"], // Placement status must be one of these values
    },
    contactNumber: {
      type: Number,
      required: true, // Contact number is required
    },
    batch: {
      type: String,
      required: true, // Batch name or identifier is required
    },
    dsa: {
      type: Number,
      required: true, // DSA (Data Structures and Algorithms) score is required
    },
    webd: {
      type: Number,
      required: true, // Web development score is required
    },
    react: {
      type: Number,
      required: true, // React score is required
    },
    interviews: [
      {
        company: {
          type: String, // Name of the company where the student interviewed
        },
        date: {
          type: String, // Date of the interview (stored as a string)
        },
        result: {
          type: String,
          enum: [
            "On Hold",
            "Selected",
            "Pending",
            "Not Selected",
            "Did not Attempt",
          ], // Possible interview results
        },
      },
    ],
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

const Student = mongoose.model("Student", studentSchema); // Create 'Student' model based on studentSchema

export default Student; // Export Student model
