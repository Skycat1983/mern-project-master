import usersModel from "../models/usersModel.js";

// GET ALL USERS
const getAllUsers = async (req, res) => {
  try {
    const allUsers = await usersModel.find({}).populate({ path: "plants" });
    console.log("all users", allUsers);
    res.status(200).json({
      number: allUsers.length,
      allUsers,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

// GET A SINGLE USER
const getUser = async (req, res) => {};

// CREATE USER
const createUser = async (req, res) => {
  console.log("create user", req.body);
  const { email, username, password, latitude, longtitude } = req.body;
  // add doc to db
  try {
    const user = await usersModel.create({
      email,
      username,
      password,
      latitude,
      longtitude,
    });
    console.log("user :>> ", user);
    res.status(200).json({
      msg: "user succesfully added",
      user,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE A USER
const deleteUser = async (req, res) => {
  try {
    // maybe should be //? findOneAndDelete
    const deleteUser = await usersModel.deleteOne({});

    console.log("delete user", deleteUser);
    res.status(200).json({
      msg: "user succesfully deleted",
      // user, //! don't show because doesn't exist?
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

// UPDATE A USER
const updateUser = async (req, res) => {
  try {
    // maybe should be //? findOneAndDelete
    const updateUser = await usersModel.updateOne({});

    console.log("update user", updateUser);
    res.status(200).json({
      msg: "profile succesfully updated",
      user,
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

export { getAllUsers, createUser, deleteUser, getUser, updateUser };

//! https://mongoosejs.com/docs/queries.html check documentation for each query type

// //userSchema
// plants: [{ type: Schema.Typew.ObjectId, ref: 'plant' }]

// //plantsSchema
// seller: {type: Schema.Types.ObjectId, ref:'Seller'},
