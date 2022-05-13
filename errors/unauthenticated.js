import CustomAPIError from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuCodes = StatusCodes.UNAUTHORIZED;
  }
}

export default UnauthenticatedError;
