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
const getUser = async (req, res) => {
  // console.log("req", req.params.id);
  const { username } = req.params;
  try {
    //! V1 findOne (works but parameter is fixed)
    const user = await usersModel
      .findOne({ username: username })
      .populate({ path: "plants" });

    //! V2 ById (works but parameter is fixed)
    // const user = await usersModel.findById("6380a9d578ce2d3f30806f28").exec();

    //! V3 (does not work)
    // const user = await usersModel.findById(id).exec();

    // console.log("get user", user);
    res.status(200).json({
      msg: "user retrieved",
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

// CREATE USER
const createUser = async (req, res) => {
  console.log("create user", req.body);
  const { email, username, password, premium } = req.body;
  // add doc to db

  try {
    const existingEmail = usersModel.findOne({ email: email });
    const existingUsername = usersModel.findOne({ username: username });
    if (existingEmail) {
      res
        .status(403)
        .json({
          msg: "task failed successfully: this email address already has an account",
        }); // todo: RESET PASSWORD
    } else if (existingUsername) {
      res
        .status(403)
        .json({ msg: "task failed successfully: username already in use" });
    } else {
      try {
        const user = await usersModel.create({
          email,
          username,
          password,
          premium,
        });
        console.log("user :>> ", user);
        res.status(200).json({
          msg: "user succesfully added",
          user,
        });
      } catch (error) {
        res
          .status(400)
          .json({ msg: "something went wrong during verification" });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during verification",
    });
  }
};

// DELETE A USER
const deleteUser = async (req, res) => {
  try {
    // maybe should be //? findOneAndDelete
    const user = await usersModel.deleteOne({});

    console.log("delete user", user);
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
    const user = await usersModel.findOneAndUpdate({ comments });

    console.log("update user", user);
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
