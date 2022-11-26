import express from "express";
import plantModel from "../models/plantsModel.js";
import {
  getAllPlants,
  createPlant,
  deletePlant,
  getPlant,
  updatePlant,
} from "../controllers/plantController.js";

const router = express.Router();

//! code below triggers after we go to "/api/plants/...", as defined in server.js

// GET ALL PLANTS
router.get("/all", getAllPlants);

// GET A SINGLE PLANT
router.get("/id/:id", getPlant);

// POST A NEW PLANT
router.post("/create", createPlant);

// DELETE A PLANT
router.delete("/delete/:id", deletePlant);

// UPDATE A NEW PLANT
router.patch("/update/:id", updatePlant);
export default router;

//! PROBLEMS:

//* post request below
// {
//     "genus": "monstera",
//     "varigation": false,
//     "rooted": true,
//     "topcutting": true,
//     "price": 50
// }

// // GET ALL PLANTS
// router.get("/all", (req, res) => {
//   //*  request (from front end), response (what we send to front end)
//   res.json({ mssg: "get all plants" });
// });

// // GET A SINGLE PLANT
// router.get("/id/:id", (req, res) => {
//   res.json({ mssg: "GET a single plant" });
// });

// // POST A NEW PLANT
// router.post("/", createPlant);

// // DELETE A PLANT
// router.delete("/:id", (req, res) => {
//   res.json({ mssg: "DELETE a plant" });
// });

// // UPDATE A NEW PLANT
// router.patch("/:id", (req, res) => {
//   res.json({ mssg: "UPDATE a plant" });
// });
