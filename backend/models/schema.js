import mongoose from "mongoose";
const employeeSchema = mongoose.Schema(
  {
    Name: {
      required: [true, "Name is required!"],
      type: String,
      trim: true,
    },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: function (email) {
          const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        },
        message: "Please enter a valid email address",
      },
    },
    Phone: {
      message: "Please enter a valid telephone number",
      type: Number,
      required: [true, "Telephone number is required"],
    },
    Address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    Degree: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    Title: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
const Stuff = mongoose.model("Stuff", employeeSchema);
export default Stuff;
