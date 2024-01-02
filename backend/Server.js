import express from "express";
import dotenv from "dotenv";
import ApiRouter from "./router/Router.js";
import mongoose from "mongoose";
import cors from "cors";
import UserRouter from "./router/UserRoutes.js";
import Book from "./models/bookSchema.js";
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
// app.use("/api/default", CreateRouter);
app.use("/api/", ApiRouter);
app.use("/users/", UserRouter);
app.use('/uploads', express.static('uploads'));

app.get('/api/books/countByAuthor', async (req, res) => {
  try {
    const bookCounts = await Book.aggregate([
      { $group: { _id: "$Author", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    res.json(bookCounts);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
