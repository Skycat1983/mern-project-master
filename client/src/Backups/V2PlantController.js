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
