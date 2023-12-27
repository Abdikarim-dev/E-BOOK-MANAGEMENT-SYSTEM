// AUTH CONTROLLER ?

import User from "../models/userShema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, async function (err, hashedPass) {
    if (err) {
      res.json({ error: err });
    }
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPass,
    });
    console.log(user)
    const result = await user.save();
    res.send({
        Name : result.name,
        Email : result.email,
        Password : result.password
    })
  });
};
export default register;
