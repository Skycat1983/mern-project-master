import usersModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordCorrect from "../utils/isPasswordCorrect.js";
import issueToken from "../utils/issueToken.js";

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
  // TODO: express email vaidation HERE

  try {
    const existingEmail = await usersModel.findOne({ email: req.body.email });
    const existingUsername = await usersModel.findOne({
      username: req.body.username,
    });
    if (existingEmail) {
      res.status(403).json({
        msg: "task failed successfully: this email address already has an account",
      }); // TODO: RESET PASSWORD
    } else if (existingUsername) {
      res
        .status(403)
        .json({ msg: "task failed successfully: username already in use" });
    } else {
      const hashedPassword = await encryptPassword(password);
      console.log("hashedPassword =", hashedPassword);
      const newUser = new usersModel({
        email: email,
        username: username,
        password: hashedPassword,
        premium: premium,
      });
      try {
        console.log("trying to save newUser");
        console.log("newUser", newUser);
        const savedUser = await newUser.save();
        res.status(201).json({
          msg: "user succesfully registered",
          user: savedUser,
        });
      } catch (error) {
        res.status(500).json({ msg: "something went wrong during signup" });
      }
    }
  } catch (error) {
    res.status(500).json({
      msg: "something went wrong during verification",
    });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await usersModel.findOne({ email: email });
    console.log("existingUser :>> ", existingUser);

    if (!existingUser) {
      res.status(200).json({ msg: "we have no record of that email address" });
    } else {
      const verified = await isPasswordCorrect(password, existingUser.password);
      // console.log("verified", verified);
      if (!verified) {
        res.status(401).json({ msg: "incorrect password" });
      }
      if (verified) {
        console.log("verified >>>>>", verified);
        const token = issueToken(existingUser._id);
        console.log("token :>> ", token);

        res.status(200).json({
          msg: "Sucessfully logged in",
          user: {
            username: existingUser.username,
            id: existingUser._id,
            email: existingUser.email,
            premium: existingUser.premium,
          },
          token,
        });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "login went wrong" });
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

export { getAllUsers, createUser, deleteUser, getUser, updateUser, loginUser };

//! https://mongoosejs.com/docs/queries.html check documentation for each query type

// //userSchema
// plants: [{ type: Schema.Typew.ObjectId, ref: 'plant' }]

// //plantsSchema
// seller: {type: Schema.Types.ObjectId, ref:'Seller'},
