import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import notfound from "./middleware/errorMiddleware.js";
import mongoose from "mongoose";
import ocrRouter from "./routes/ocrRouter.js";

const app = express();
const PORT = process.env.PORT || 5000;

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");
  } catch (err) {
    console.error(`DB Error Message: ${err.message}`);
  }
};

connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", ocrRouter);

app.get("/", (req, res) => res.send("Server is ready"));

app.use(notfound);

app.listen(PORT, () => console.log(`Server is running port : ${PORT}`));
