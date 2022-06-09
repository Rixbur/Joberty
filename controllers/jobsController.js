import Job from "../models/job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "../errors/index.js";
const createJob = async (req, res, next) => {
  try {
    const { position, company } = req.body;
    if (!position || !company) {
      throw new BadRequest("Please provide all values");
    }
    req.body.createdBy = req.user.userId;
    const job = await Job.create(req.body);
    res.status(StatusCodes.CREATED).json({ job });
  } catch (error) {
    next(error);
  }
};
const getAllJobs = async (req, res, next) => {
  try {
    const jobs = await Job.find({ createdBy: req.user.userId });
    res
      .status(StatusCodes.OK)
      .json({ jobs, totalJobs: jobs.length, numOfPages: 1 });
  } catch (error) {
    next(error);
  }
};
const updateJob = async (req, res) => {
  res.send("Update Job");
};
const deleteJob = async (req, res) => {
  res.send("Delete Job");
};
const showStats = async (req, res) => {
  res.send("Show stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
