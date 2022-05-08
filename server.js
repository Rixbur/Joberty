import express from "express";
import dotenv from "dotenv";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";
import connectDB from "./db/connect.js";
import authRouter from "./routes/authRoutes.js";
import jobRouter from "./routes/jobsRoutes.js";
import "express-async-error";

dotenv.config();
const app = express();

app.use(express.json()); //check this

app.get("/", (req, res) => {
  res.send("Welcome!");
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobRouter);
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
