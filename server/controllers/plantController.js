import plantModel from "../models/plantsModel.js";
import { v2 as cloudinary } from "cloudinary";

// GET ALL PLANTS
const getAllPlants = async (req, res) => {
  try {
    const allPlants = await plantModel
      .find({})
      .populate({ path: "user", select: ["email", "password"] });
    console.log("all plants", allPlants);
    res.status(200).json({
      number: allPlants.length,
      allPlants,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

// GET A SINGLE PLANT
const getPlant = async (req, res) => {};

// POST A NEW PLANT
const createPlant = async (req, res) => {
  console.log("create plant", req.body);
  const { genus, varigation, rooted, topcutting, price } = req.body;
  // add doc to db
  try {
    const plant = await plantModel.create({
      genus,
      varigation,
      rooted,
      topcutting,
      price,
    });
    console.log("plant :>> ", plant);
    res.status(200).json({
      msg: "plant succesfully added",
      plant,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// UPLOAD IMAGE
const uploadImage = async (req, res) => {
  try {
    console.log("req :>> ", req.file);
    // Upload the image
    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "plant-images",
    });
    console.log("result >>>>", uploadResult);
    res.status(200).json({
      msg: "image upload Ok",
      image: uploadResult.url,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "error uploading picture",
      error: error,
    });
  }
};

// DELETE A PLANT
const deletePlant = async (req, res) => {
  try {
    // maybe should be //? findOneAndDelete
    const deletePlant = await plantModel.deleteOne({});

    console.log("delete plant", deletePlant);
    res.status(200).json({
      msg: "plant succesfully deleted",
      plant,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

// UPDATE A NEW PLANT
const updatePlant = async (req, res) => {
  try {
    // maybe should be //? findOneAndDelete
    const updatePlant = await plantModel.updateOne({});

    console.log("update plant", updatePlant);
    res.status(200).json({
      msg: "plant succesfully updated",
      plant,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

export {
  getAllPlants,
  createPlant,
  uploadImage,
  deletePlant,
  getPlant,
  updatePlant,
};
