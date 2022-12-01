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
      // imageUrls,
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
//! i think the error "Cannot set headers after they are sent to the client" comes from https://stackoverflow.com/questions/7042340/error-cant-set-headers-after-they-are-sent-to-the-client
// const uploadImage = async (req, res) => {
//   const imagesArray = [];
//   try {
//     req.files.forEach(async (file, index, arr) => {
//       const uploadResult = await cloudinary.uploader.upload(file.path, {
//         folder: "plant-images",
//       });
//       // console.log("uploadResult >>>>", uploadResult.url);
//       imagesArray.push(uploadResult.url);

//       console.log("imagesArray :>> ", imagesArray);
//       console.log("index...", index, imagesArray.length);
//       if (index < imagesArray.length - 1) {
//         console.warn("should only be visible once");
//       }
//     });
//     res.status(200).json({
//       msg: "image upload Ok",
//       image: imagesArray,
//     });

//     // const imgArrayOfPromises = req.files.map(async (file) => {
//     //   const uploadResult = await cloudinary.uploader.upload(file.path, {
//     //     folder: "plant-images",
//     //   });
//     //   return uploadResult.url;
//     // });
//     // console.log("imgArrayOfPromises :>> ", imgArrayOfPromises);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       msg: "error uploading picture",
//       error: error,
//     });
//   }
// };

//! UPLOAD IMAGE V1
const uploadImage = async (req, res) => {
  try {
    // console.log("req :>> ", req.file);
    // Upload the image
    // const imagesArray = [];
    // req.files.forEach(async (file, index) => {
    //   const uploadResult = await cloudinary.uploader.upload(file.path, {
    //     folder: "plant-images",
    //   });
    //   // console.log("uploadResult >>>>", uploadResult.url);
    //   imagesArray.push(uploadResult.url);
    //   console.log("imagesArray :>> ", imagesArray);
    //   console.log("index...>>>>", index);
    //   console.log("imagesArray.lenght :>> ", imagesArray.length);
    //   if (index < imagesArray.length - 1) {
    //     res.status(200).json({
    //       msg: "image upload Ok",
    //       image: imagesArray,
    //     });
    //   }
    // });
    const imgArrayOfPromises = req.files.map(async (file) => {
      const uploadResult = await cloudinary.uploader.upload(file.path, {
        folder: "plant-images",
      });
      return uploadResult.url;
    });

    let urls = await Promise.all(imgArrayOfPromises);
    console.log('"urls" :>> ', urls);
    res.status(200).json({
      urls,
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

//! image format deets below
// const uploadImage = async (req, res) => {
//   // console.log("ln 54 req.files :>> >>>>>>>", req.files);
//   try {
//     // console.log("req :>> ", req.file);
//     // Upload the image
//     const imagesArray = [];
//     req.files.forEach(async (file) => {
//       const uploadResult = await cloudinary.uploader.upload(file.path, {
//         folder: "plant-images",
//         //to format the picture during the  upload
//         // transformation: [
//         //   { width: 150, height: 150, gravity: "face", crop: "thumb" },
//         //   { radius: 20 },
//         //   { effect: "sepia" },
//         //   {
//         //     overlay: "cloudinary_icon_blue",
//         //     gravity: "south_east",
//         //     x: 5,
//         //     y: 5,
//         //     width: 50,
//         //     opacity: 60,
//         //     effect: "brightness:200",
//         //   },
//         //   { angle: 10 },
//         // ],
//       });
//       // console.log("uploadResult >>>>", uploadResult);
//       imagesArray.push(uploadResult.url);
//       res.status(200).json({
//         msg: "image upload Ok",
//         image: imagesArray,
//       });
//     });
//     // console.log('imagesArray :>> ', imagesArray);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       msg: "error uploading picture",
//       error: error,
//     });
//   }
// };
