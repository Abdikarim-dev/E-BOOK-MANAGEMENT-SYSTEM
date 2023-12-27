import express from "express";
import Stuff from "../models/schema.js";
import data from "../data.js";

const CreateRouter = express.Router();
// const app = express();

CreateRouter.get('/', async (req, res) => {

  const query = Stuff.insertMany(data.employee)
  query.then((result) => {
    res.send({
        Message:res.message
    })
  }).catch((err) => {
    console.log(err)
  });
//   res.send({query});
});
export default CreateRouter;