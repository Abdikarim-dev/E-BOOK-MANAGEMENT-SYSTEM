import express from "express";
import dotenv from "dotenv";
import ApiRouter from "./router/Router.js";
import mongoose from "mongoose";
import CreateRouter from "./router/CreateRouter.js";
import cors from "cors";
const app = express();

dotenv.config();

const port = process.env.PORT;
const DB_URL = process.env.DB_URL;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
// connection to the database
mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((err) => console.log(err.message));

// API routes
app.use("/api/default", CreateRouter);
app.use("/api/", ApiRouter);
app.use('/uploads', express.static('uploads'));
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
