import CustomAPIError from "./custom-api.js";
import { StatusCodes } from "http-status-codes";

class BadRequest extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statuCodes = StatusCodes.BadRequest;
  }
}

export default BadRequest;
