import UserModel from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest, UnauthenticatedError } from "../errors/index.js";
import { query } from "express";

const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      throw new BadRequest("Please provide all values");
    }
    const userAlreadyExists = await UserModel.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequest("Email already in use");
    }
    const user = await UserModel.create({ name, email, password });
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({
      // we are hardcoding here to avoid returning password, because YOU CANNOT ignore password in .create query, only in other ones
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequest("Please provide all values");
    }
    //gotcha is that we setup in model that we dont want password in queries
    //That is why we add .select('+password')
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) {
      throw new UnauthenticatedError("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnauthenticatedError("Invalid Credentials");
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({
      // we are hardcoding here to avoid returning password, because YOU CANNOT ignore password in .create query, only in other ones
      // or set user.password = undefined
      user: {
        email: user.email,
        lastName: user.lastName,
        location: user.location,
        name: user.name,
      },
      token,
      location: user.location,
    });
  } catch (error) {
    next(error);
  }
};
const updateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequest("Please provide all values");
  }
  const user = await UserModel.findOne({ _id: req.user.userId });
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();

  //optional to recreate token, but should be done
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ user, token, location: user.location });

  console.log(req.user);
};

export { register, login, updateUser };
