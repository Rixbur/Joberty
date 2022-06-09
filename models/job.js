import mongoose from "mongoose";
const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, "Please provide company"],
      minlength: 3,
      maxlength: 20,
      trim: true,
    },
    position: {
      type: String,
      required: [true, "Please provide position"],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ["interview", "declined", "pending"],
      default: "pending",
    },
    jobType: {
      type: String,
      enum: ["full-time", "remote", "part-time", "internship"],
      default: "full-time",
    },
    jobLocation: {
      type: String,
      default: "My City",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: [true, "Please provide User"],
    },
  },
  { timestamps: true }
);
export default mongoose.model("Job", JobSchema);
