import { StatusCodes } from "http-status-codes";

// this file has to be implemented like it is stated in Express dosc
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err); //or  console.log(err.stack);
  const defaultErorr = {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "Something went wrong, try again later",
  };
  res.status(defaultErorr.statusCode).send({ msg: err }); //while working with Mongoose and Postman you would like to still print whole err
};
export default errorHandlerMiddleware;
//place it last
