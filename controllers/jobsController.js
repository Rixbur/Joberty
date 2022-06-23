import Job from "../models/job.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, NotFound, UnauthenticatedError } from "../errors/index.js";
import checkPermissions from "../utils/checkPermissions.js";
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
    const { status, jobType, sort, search } = req.query;

    const queryObject = {
      createdBy: req.user.userId,
    };
    // add stuff based on condition

    if (status && status !== "all") {
      queryObject.status = status;
    }
    if (jobType && jobType !== "all") {
      queryObject.jobType = jobType;
    }
    if (search) {
      queryObject.position = { $regex: search, $options: "i" };
    }
    // NO AWAIT

    let result = Job.find(queryObject);

    // chain sort conditions

    if (sort === "latest") {
      result = result.sort("-createdAt");
    }
    if (sort === "oldest") {
      result = result.sort("createdAt");
    }
    if (sort === "a-z") {
      result = result.sort("position");
    }
    if (sort === "z-a") {
      result = result.sort("-position");
    }

    //

    // setup pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;
    const skip = (page - 1) * limit;

    result = result.skip(skip).limit(limit);

    const jobs = await result;

    const totalJobs = await Job.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalJobs / limit);

    res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
  } catch (error) {
    next(error);
  }
};
const updateJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const { company, position } = req.body;

    if (!position || !company) {
      throw new BadRequest("Please provide all values");
    }
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      throw new NotFound(`No job with id : ${jobId}`);
    }
    //check permissions
    checkPermissions(req.user, job.createdBy);

    //this wont trigger any hooks, so if you are using hooks
    //you have to augment job.property = new_property and do job.save
    //all new properties also need to be pulled out of req.body
    const updatedJob = await Job.findOneAndUpdate({ _id: jobId }, req.body, {
      new: true,
      runValidators: true,
      //these validators only run for props that we provide
    });
    res.status(StatusCodes.OK).json({ updatedJob });
  } catch (error) {
    next(error);
  }
};
const deleteJob = async (req, res, next) => {
  try {
    const { id: jobId } = req.params;
    const job = await Job.findOne({ _id: jobId });
    if (!job) {
      throw new NotFound(`No job with id : ${jobId}`);
    }
    checkPermissions(req.user, job.createdBy);
    await job.remove();
    res.status(StatusCodes.OK).json({ msg: "Success! Job is deleted" });
  } catch (error) {
    next(error);
  }
};
const showStats = async (req, res) => {
  res.send("Show stats");
};

export { createJob, getAllJobs, updateJob, deleteJob, showStats };
