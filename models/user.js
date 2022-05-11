import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
    select: false, //excluded from queries, doesnt work for .create query
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

UserSchema.methods.createJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });
};

export default mongoose.model("User", UserSchema);
