import mongoose from "mongoose";
const bookSchema = mongoose.Schema(
  {
    Title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
    },
    Author: {
      required: [true, "Author is required!"],
      type: String,
      trim: true,
    },
    Image:{
        required: [true, "Image File is required"],
        type: String,
    },
    File:{
        required: [true, "File is required"],
        type: String,
    },

  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("Book", bookSchema);
export default Book;
