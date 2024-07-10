import mongoose from "mongoose"; // Import mongoose library
import bcrypt from "bcrypt"; // Import bcrypt library for password hashing

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name of the user is required
    },
    email: {
      type: String,
      unique: true, // Email must be unique across all users
      required: true, // Email is required
    },
    passwordHash: {
      type: String,
      required: true, // Hashed password is required
    },
  },
  { timestamps: true } // Automatically manage createdAt and updatedAt fields
);

// Virtual property to set hashed password
userSchema.virtual("password").set(function (value) {
  this.passwordHash = bcrypt.hashSync(value, 12); // Hash the password using bcrypt with salt factor 12
});

// Method to compare hashed password
userSchema.methods.isPasswordCorrect = function (password) {
  return bcrypt.compareSync(password, this.passwordHash); // Compare provided password with stored hashed password
};

const User = mongoose.model("User", userSchema); // Create 'User' model based on userSchema

export default User; // Export User model
