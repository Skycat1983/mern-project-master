import plantModel from "../models/plantsModel.js";
import { v2 as cloudinary } from "cloudinary";
import userModel from "../models/usersModel.js";

// GET ALL PLANTS
const getAllPlants = async (req, res) => {
  try {
    const allPlants = await plantModel
      .find({})
      .populate({ path: "user", select: ["email", "password", "premium"] });
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
//! problems with where to use/not use underscore with id here
const getPlant = async (req, res) => {
  // uncomment greens for plant retrieved, plant: null
  //* const { _id } = req.params;

  // uncomment reds for same plant every time
  const { id } = req.params;

  //! const { id } = req.params;

  try {
    const plant = await plantModel.findById(id);

    //! const plant = await plantModel.findOne({ _id: id });

    // const plant = await plantModel.findOne({ _id: ObjectId });

    res.status(200).json({
      msg: "plant retrieved",
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

// POST A NEW PLANT
const createPlant = async (req, res) => {
  console.log("create plant", req.body);
  const { genus, varigation, rooted, topcutting, price, imageUrls, user } =
    req.body;
  // add doc to db
  try {
    const plant = await plantModel.create({
      genus,
      varigation,
      rooted,
      topcutting,
      imageUrls,
      price,
      user,
    });
    console.log("plant :>> ", plant);
    console.log("USER", user);
    // https://attacomsian.com/blog/mongoose-push-pull-items-from-array
    // await plantModel.create({ _id: user });
    const updateUser = await userModel.findOne({ _id: user });
    console.log("the user to be updated", updateUser);
    updateUser.plants.push(plant._id);
    await updateUser.save();

    res.status(200).json({
      msg: "plant succesfully added",
      plant,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//! UPLOAD IMAGE V1
const uploadImage = async (req, res) => {
  try {
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

// //! image format deets below
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

//   // res.send("you requested to see plant with the id of" + req.params.id);
//* http://localhost:5001/api/plants/id/63909911d513889bf1ec6b01
// console.log("req", req.params.id);
