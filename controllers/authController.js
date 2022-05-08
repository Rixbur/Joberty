import UserModel from "../models/user.js";
import { StatusCodes } from "http-status-codes";

const register = async (req, res) => {
  const user = await UserModel.create(req.body);
  res.status(StatusCodes.OK).json({ user });
};
const login = async (req, res) => {
  res.send("Login user");
};
const updateUser = async (req, res) => {
  res.send("Update user");
};

export { register, login, updateUser };
