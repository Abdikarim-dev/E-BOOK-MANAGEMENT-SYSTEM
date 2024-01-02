import User from "../models/userShema.js";
import express from "express";
import register from "../controller/AuthController.js";
const UserRouter = express.Router();
import bcrypt from 'bcrypt'

UserRouter.post("/register", register);

// Abdinasir ALi Yusuf

UserRouter.get("/all", async function (req, res) {
    const query = await User.find();
    res.send(query);
  });

UserRouter.put("/update/:id", async function (req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
  
    const query = await User.findByIdAndUpdate(id, {
      name,
      email,
    });
    try {
      res.status(200).send("USER UPDATED SUCCESSFULLY :)");
    } catch (error) {
      res.status(400).send({ Message: error.message });
    }
  });

// Change password
UserRouter.post('/password/:id', async (req, res) => {
    try {
      console.log("1")
        const user = await User.findById(req.params.id);
        const { currentPassword, newPassword } = req.body;
  
        console.log("2")
        console.log("3")

        if (!bcrypt.compareSync(currentPassword, user.password)) {
          console.log("INSIDE COMPARING AND IT'S NOT SAME")
            return res.status(401).send({ message: "Current password is incorrect" });
        }
        console.log("3")
        const hashedNewPassword = bcrypt.hashSync(newPassword, 10);
        console.log("4")
        user.password = hashedNewPassword;
        console.log("5")
        await user.save();
  
        res.status(200).json({ message: "Password changed successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error changing password :",error : error.message });
    }
  });

UserRouter.delete("/delete/:id", async function (req, res) {
  const { id } = req.params;

  const query = await User.findByIdAndDelete(id)
    .then(() => {
      res.status(200).send("User Deleted Successfully :(");
    })
    .catch((err) => {
      res.status(401).send({
        ErrorMessage: err.message,
      });
    });
});

export default UserRouter;
