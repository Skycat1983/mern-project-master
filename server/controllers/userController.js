import usersModel from "../models/usersModel.js";
import encryptPassword from "../utils/encryptPassword.js";
import isPasswordCorrect from "../utils/isPasswordCorrect.js";
import issueToken from "../utils/issueToken.js";
import commentsModel from "../models/commentsModel.js";
import subscriptionssModel from "../models/commentsModel.js";

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
  console.log("req>>>>>", req.params.id);
  const { username } = req.params;
  try {
    const user = await usersModel
      .findOne({ username: username })
      .populate({ path: "plants" })
      .populate({ path: "commentsby" })
      .populate({
        path: "commentsfor",
        populate: { path: "author" },
      })
      .populate({ path: "subscriptions" })
      .populate({ path: "subscribers" });

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
  const { email, username, password, premium, avatar, coverpicture } = req.body;
  // TODO: express email vaidation HERE
  if (!email) {
    res.send(546);
  }
  try {
    const existingEmail = await usersModel.findOne({ email: req.body.email });
    const existingUsername = await usersModel.findOne({
      username: req.body.username,
    });
    if (existingEmail) {
      res.status(403).json({
        emailError: "account already exists",
      }); // TODO: RESET PASSWORD
    } else if (existingUsername) {
      res.status(403).json({ usernameError: "username taken" });
    } else {
      const hashedPassword = await encryptPassword(password);
      console.log("hashedPassword =", hashedPassword);
      const newUser = new usersModel({
        email: email,
        username: username,
        password: hashedPassword,
        premium: premium,
        avatar: avatar,
        coverpicture: coverpicture,
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
      res.status(401).json({ errorMessage: "email address not found" });
    } else {
      const verified = await isPasswordCorrect(password, existingUser.password);
      // console.log("verified", verified);
      if (!verified && existingUser) {
        res.status(401).json({
          errorMessage: "incorrect password",
          // emailMessage: "email address found",
        });
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

// VERIFY TOKEN/WRITSTBAND
const getProfile = async (req, res) => {
  console.log("req.user", req.user);
  const {
    email,
    username,
    _id,
    premium,
    aboutus,
    createdAt,
    subscriptions,
    subscribers,
  } = req.user;

  res.status(200).json({
    // user: req.user,
    username: username,
    id: _id,
    email: email,
    premium: premium,
    aboutus: aboutus,
    createdAt: createdAt,
    subscriptions: subscriptions,
    subscribers: subscribers,
  });
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
  const { username, aboutus } = req.body;
  const filter = { username: username };
  const update = { aboutus: aboutus };

  //! i wanted to try something like this:
  // const { username, toPatch } = req.body;

  try {
    const user = await usersModel.findOneAndUpdate(filter, update, {
      new: true,
      //! and this
      // toPatch: toPatch,
    });

    console.log("update user", user);
    res.status(200).json({
      user,
      modal: "about us succesfully updated",
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      modal: "there was a problem in the server",
    });
  }
};

// UPDATE ACCOUNT
const updateAccount = async (req, res) => {
  const { premium, currency, language, id } = req.body;
  let toUpdate = {
    premium: premium,
    currency: currency,
    language: language,
  };
  console.log("toUpdate", toUpdate);
  //! membership does not overwrite!
  try {
    const findUser = await usersModel.findByIdAndUpdate(id, toUpdate, {
      upsert: true,
      new: true,
    });

    console.log("update user account", findUser);
    res.status(200).json({
      findUser,
      modal: "account settings succesfully updated",
    });

    // const findUser = await usersModel.findById({ _id: _id });
    //! problem if pushing 'false'?
    // if (findUser.membership !== membership) {
    //   toUpdate.push(membership);
    // }
    // if (findUser.currency !== currency) {
    //   toUpdate.push(currency);
    // }
    // if (findUser.language !== language) {
    //   toUpdate.push(language);
    // }
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      modal: "there was a problem in the server",
    });
  }
};

const addRemoveSubscription = async (req, res) => {
  const { subscriberid, providerid } = req.body;
  try {
    const findingSubscriber = await usersModel.findById({ _id: subscriberid });
    if (findingSubscriber.subscriptions.length === 0) {
      const findingSubs = await usersModel.findByIdAndUpdate(
        { _id: subscriberid },
        { $push: { subscriptions: providerid } },
        {
          returnOriginal: false,
        }
      );
      const findingProvider = await usersModel.findById({ _id: providerid });
      if (findingProvider.subscribers.length === 0) {
        const findingSubs = await usersModel.findByIdAndUpdate(
          { _id: providerid },
          { $push: { subscribers: subscriberid } },
          {
            returnOriginal: false,
          }
        );
        res.status(201).json({
          msg: "added to favorites",
          // user: {
          // },
        });
      }
    }
    if (findingSubscriber.subscriptions.length > 0) {
      if (findingSubscriber.subscriptions.includes(providerid)) {
        try {
          const removeSubscription = await usersModel.findByIdAndUpdate(
            { _id: subscriberid },
            { $pull: { subscriptions: providerid } },
            {
              returnOriginal: false,
            }
          );
          const removeSubscriber = await usersModel.findByIdAndUpdate(
            { _id: providerid },
            { $pull: { subscribiers: subscriberid } },
            {
              returnOriginal: false,
            }
          );
          res.status(201).json({
            msg: "removed from favourites",
            // user: {
            // },
          });
        } catch {
          res.status(500).json({ msg: "error removing favorite" });
        }
      }
    } else {
      try {
        const addSubscription = await usersModel.findByIdAndUpdate(
          { _id: subscriberid },
          { $push: { subscriptions: providerid } },
          {
            returnOriginal: false,
          }
        );
        const addSubscriber = await usersModel.findByIdAndUpdate(
          { _id: providerid },
          { $push: { subscriptions: subscriberid } },
          {
            returnOriginal: false,
          }
        );
        res.status(201).json({
          msg: "added to favorites",
          // user: {
          // },
        });
        console.log("findingFavourites >>>", findingFavourites);
      } catch (error) {
        res.status(500).json({ msg: "error adding subs" });
      }
    }
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ msg: "user clicking in favourites not found" });
  }
};

export {
  getAllUsers,
  getProfile,
  createUser,
  deleteUser,
  getUser,
  updateUser,
  updateAccount,
  loginUser,
  addRemoveSubscription,
};

//! https://mongoosejs.com/docs/queries.html check documentation for each query type

// //userSchema
// plants: [{ type: Schema.Typew.ObjectId, ref: 'plant' }]

// //plantsSchema
// seller: {type: Schema.Types.ObjectId, ref:'Seller'},
