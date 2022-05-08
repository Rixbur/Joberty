import mongoose, { mongo } from "mongoose";
import validator from "validator";
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 3,
    maxlength: 20,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide email"],
    validate: {
      validator: validator.isEmail,
      message: "Please provide valid email",
    },
    unique: true, //could also be checked in controller only, or apply REGEX to validate email format
  },
  password: {
    type: String,
    required: [true, "Please provide password"],
    minlength: 6,
    trim: true,
  },
  lastName: { type: String, maxlength: 20, trim: true, default: "myLastName" },
  location: { type: String, maxlength: 20, trim: true, default: "myCity" },
});

export default mongoose.model("User", UserSchema);
