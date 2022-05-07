// this file has to be implemented like it is stated in Express dosc
const errorHandlerMiddleware = (err, req, res, next) => {
  console.error(err); //or  console.log(err.stack);
  res.status(500).send("Something broke!");
};
export default errorHandlerMiddleware;
//place it last
