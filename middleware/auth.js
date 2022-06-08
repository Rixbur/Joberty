import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer")) {
      throw new UnauthenticatedError("Authentication Invalid here");
    }
    const token = authHeader.split(" ")[1];
    //custom function to catch errors
    const payload = jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
      if (err) {
        throw new UnauthenticatedError("Jwt verify failed");
      } else {
        return result;
      }
    });
    req.user = { userId: payload.userId };
    next();
  } catch (error) {
    next(error);
  }
};

export default auth;
