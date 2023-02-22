import express from "express";
import plantModel from "../models/plantsModel.js";
import multerUpload from "../middlewares/multerUpload.js";
import {
  getAllPlants,
  createPlant,
  uploadImage,
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

// UPLOAD IMAGE
router.post("/uploadimage", multerUpload.array("image", 3), uploadImage);
//* .array(fieldname[, maxCount]) for multiple files. stored in req.files
//* .single(fieldname) stored in req.file.

// DELETE A PLANT
router.delete("/delete/:id", deletePlant);

// UPDATE A NEW PLANT
router.patch("/update/:id", updatePlant);
export default router;
