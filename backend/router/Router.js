import express from "express";
import dotenv from "dotenv";
import Stuff from "../models/schema.js";
dotenv.config();
import multer from "multer";
import fs from "fs";
import Book from "../models/bookSchema.js";

import User from "../models/userShema.js";
import bcrypt from "bcryptjs";
import deleteFile from "./Test.js";
// const upload = multer({ dest:'uploads/'})
const ApiRouter = express.Router();

// Read all data from
ApiRouter.get("/all", async (req, res) => {
  const query = await Stuff.find();
  res.send(query);
});

// Inserting data via router
ApiRouter.post("/insert", async (req, res) => {
  const query = new Stuff({
    Name: req.body.Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Address: req.body.Address,
    Degree: req.body.Degree,
    Title: req.body.Title,
  });
  const result = await query.save();
  res.send({
    Name: result.Name,
    Email: result.Email,
    Phone: result.Phone,
    Address: result.Address,
    Degree: result.Degree,
    Title: result.Title,
  });
});

// Update the Employee
ApiRouter.put("/update/:id", async (req, res) => {
  const id = req.params.id;
  const query = Stuff.findByIdAndUpdate(id, {
    Name: result.Name,
    Email: result.Email,
    Phone: result.Phone,
    Address: result.Address,
    Degree: result.Degree,
    Title: result.Title,
  });
  query
    .then(function (result) {
      res.send({
        Message: "Employee updated successfully",
        Response: result.message,
      });
    })
    .catch(function (err) {
      res.send({
        Message: "Employee is not updated",
        Response: err.message,
      });
    });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadDir = "./uploads/"; // Update this path

    if (file.mimetype.startsWith("image")) {
      uploadDir += "images/";
    } else if (file.mimetype === "application/pdf") {
      uploadDir += "pdfs/";
    } else {
      uploadDir += "other/";
    }

    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now();
    cb(null, uniqueSuffix + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

ApiRouter.post(
  "/upload-pdf",
  upload.array("files", 10),
  async function (req, res) {
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const image = req.files.find((file) => file.mimetype.startsWith("image"));
      const pdf = req.files.find((file) => file.mimetype === "application/pdf");

      if (!image || !pdf) {
        return res
          .status(400)
          .json({ message: "Both image and PDF files are required" });
      }

      const query = new Book({
        Title: req.body.Title,
        Author: req.body.Author,
        Image: image.filename, // Use the filename here
        File: pdf.filename, // Use the filename here
      });

      const result = await query.save();

      res.status(201).json({
        Title: result.Title,
        Author: result.Author,
        Image: result.Image,
        File: result.File,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error?" });
    }
  }
);

ApiRouter.get('/authors', async (req, res) => {
  try {
    // MongoDB aggregation pipeline
    const pipeline = [
      { $group: { _id: "$Author", count: { $sum: 1 } } } // Group by author and count their books
    ];

    const authorsWithBookCount = await Book.aggregate(pipeline);

    if (authorsWithBookCount.length === 0) {
      return res.status(404).send({ message: "No authors found." });
    }

    res.status(200).json(authorsWithBookCount.length);
  } catch (error) {
    res.status(500).json({ message: "Error fetching author data", error: error.message });
  }
});


// ApiRouter.delete('/delete/:id', (req, res) => {
//   const {id} = req.params.id;

//   Book.findByIdAndDelete(id);
// })

// ApiRouter.delete("/books/delete/:id", async (req, res) => {
//   let { id } = req.params;
//   await Book.findByIdAndDelete(id)
//     // .then((result) => {
//     //   if (result.Image != "") {
//     //     const image = result.Image;
//     //     const folder = "images"
//     //     deleteFile(image, folder)
//     //   }
//     //   if (result.File != "") {
//     //     const folder = "pdfs"
//     //     const file = result.File.trim();
//     //     deleteFile(file,folder)
//     //

//     .catch(function (err) {
//       res.status(401).send(err.message);
//     });
// });


// Jabril Abdullahi Kulane

ApiRouter.get("/books/all", async (req, res) => {
  const query = await Book.find();
  res.send(query);
});

ApiRouter.delete('/books/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
      // Find the book by ID and delete it
      const bookToDelete = await Book.findByIdAndDelete(id);
      if (bookToDelete) {
          res.status(200).send(`Book with id ${id} deleted successfully.`);
      } else {
          res.status(404).send('Book not found');
      }
  } catch (error) {
      console.error(error);
      res.status(500).send(error.message);
  }
});




// ApiRouter.delete("/books/delete/:id", async (req, res) => {
//   let { id } = req.params;
//   try {
//     const result = await Book.findByIdAndDelete(id);
//     if (result) {
//       // if (result.Image && result.Image.trim() !== "") {
//       //   const imagePath = path.join(__dirname, '..', 'uploads', 'images', result.Image.trim());
//       //   fs.unlinkSync(imagePath);
//       // }
//       if (result.File && result.File.trim() !== "") {
//         const filePath = path.join(__dirname, '../uploads/pdfs', result.File.trim());
//         if (fs.existsSync(filePath)) {
//             fs.unlinkSync(filePath);
//         } else {
//             console.log('File not found:', filePath);
//         }
//     }
//       // send successful response
//     } else {
//       res.status(404).send('Book not found');
//     }
//   } catch (error) {
//     console.log(error);
//     res.status(500).send(error.message);
//   }
// });

// Abdirahman Shiine 
ApiRouter.put(
  "/books/update/:id",
  upload.array("files", 10),
  async function (req, res) {
    let { id } = req.params;
    try {
      if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const image = req.files.find((file) => file.mimetype.startsWith("image"));
      const pdf = req.files.find((file) => file.mimetype === "application/pdf");

      if (!image || !pdf) {
        return res
          .status(400)
          .json({ message: "Both image and PDF files are required" });
      }

      const query = new Book({
        Title: req.body.Title,
        Author: req.body.Author,
        Image: image.filename, // Use the filename here
        File: pdf.filename, // Use the filename here
      });

      const result = await Book.findByIdAndUpdate(id, {
        ...req.body,
        Image: image.filename,
        File: pdf.filename,
      });

      res.status(201).json({
        Title: result.Title,
        Author: result.Author,
        Image: result.Image,
        File: result.File,
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Internal server error?" });
    }
  }
);
// API endpoint to retrieve books grouped by author
ApiRouter.get("/books/grouped-by-author", async (req, res) => {
  try {
    const result = await Book.aggregate([
      {
        $group: {
          _id: "$author",
          authorName: { $first: "$author" },
          books: {
            $push: {
              title: "$title",
              image: "$image",
              pdfFile: "$pdfFile",
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          author: "$_id",
          authorName: 1,
          books: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// AUTH ROUTE

// Abdijabaar Assad
ApiRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).send({ ErrorMessage: "User not found" });

  const dbPassword = user.password;
  bcrypt.compare(password, dbPassword).then((match) => {
    if (!match) return res.status(400).send({ ErrorMessage: "Wrond password" });
    else {
      res.status(200).send({ Message: "Logged in" });
    }
  });
});

// Abdinasir Ali Yusuf

export default ApiRouter;
