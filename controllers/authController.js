import UserModel from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import { BadRequest } from "../errors/index.js";

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
    res.status(StatusCodes.OK).json({ user });
  } catch (error) {
    next(error);
  }
};
const login = async (req, res) => {
  res.send("Login user");
};
const updateUser = async (req, res) => {
  res.send("Update user");
};

export { register, login, updateUser };
