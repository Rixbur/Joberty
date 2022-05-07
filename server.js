import express from "express";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import connectDB from "./db/connect.js";

dotenv.config();
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome!");
});

app.use(notFoundMiddleware);

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => {
      console.log(`Server is listening on the port: ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
