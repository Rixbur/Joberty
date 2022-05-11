import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
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
  lastName: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "myLastName",
  },
  location: {
    type: String,
    maxlength: 20,
    trim: true,
    default: "myCity",
  },
});

UserSchema.pre("save", async function () {
  //setup as async if you function is using promises

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
});

export default mongoose.model("User", UserSchema);
