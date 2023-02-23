import factModel from "../models/factsModel.js";

const getAllFacts = async (req, res) => {
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

// GET A SINGLE fact
const getFact = async (req, res) => {
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

export { getAllFacts, getFact };
