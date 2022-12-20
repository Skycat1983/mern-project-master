import usersModel from "../models/usersModel.js";
import subscriptionModel from "../models/subscriptionsModel.js";

const getSubscription = async (req, res) => {
  const { profileid, userid } = req.body;

  try {
    const findSub = await subscriptionModel.findOne({
      sellerid: profileid,
      subscriberid: userid,
    });
    if (!findSub) {
      res.status(201).json({ msg: "not subscribed" });
    } else {
      console.log("findSub", findSub);
      // console.log("in find sub");
      res.status(201).json({
        msg: "subscribed",
        // findSub,
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

const createSubscription = async (req, res) => {
  const { subscriberid, sellerusername } = req.body;

  try {
    const findIdOfSeller = await usersModel.findOne({
      username: sellerusername,
    });
    console.log("findIdOfSeller", findIdOfSeller);
    const { _id } = findIdOfSeller._id;
    console.log("_id", _id);
    const subscriptionM = new subscriptionModel({
      sellerid: _id,
      subscriberid,
      // plants,
    });
    // .populate("plants");
    const subscription = await subscriptionM.save();

    console.log("subscription>>>", subscription);

    //! subscription is link to subscription._id, not to user. is this correct?
    const updateSubscriptions = await usersModel.findOneAndUpdate(
      { _id: subscriberid },
      { $push: { subscriptions: subscription._id } },
      {
        returnOriginal: false,
      }
    );
    console.log("updateSubscription", updateSubscriptions);
    // .populate({
    //   path: "subscriptions",
    // });

    //! = page we are on
    // const findingProvider = await usersModel.findById({ _id: sellerid });
    //! subscriber is link to subscription._id, not to user. is this correct?
    const updateSubscribers = await usersModel.findOneAndUpdate(
      { username: sellerusername },
      { $push: { subscribers: subscription._id } },
      {
        returnOriginal: false,
      }
    );
    res.status(201).json({
      msg: "subscribed",
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }

  //   if (findingSubscriber.subscriptions.length > 0) {
  //     if (findingSubscriber.subscriptions.includes(providerid)) {
  //       try {
  //         const removeSubscription = await usersModel.findByIdAndUpdate(
  //           { _id: subscriberid },
  //           { $pull: { subscriptions: sellerid } },
  //           {
  //             returnOriginal: false,
  //           }
  //         );
  //         const removeSubscriber = await usersModel.findByIdAndUpdate(
  //           { _id: sellerid },
  //           { $pull: { subscribiers: subscriberid } },
  //           {
  //             returnOriginal: false,
  //           }
  //         );
  //         res.status(201).json({
  //           msg: "removed from favourites",
  //         });
  //       } catch {
  //         res.status(500).json({ msg: "error removing favorite" });
  //       }
  //     }
  //   } else {
  //     try {
  //       const addSubscription = await usersModel.findByIdAndUpdate(
  //         { _id: subscriberid },
  //         { $push: { subscriptions: providerid } },
  //         {
  //           returnOriginal: false,
  //         }
  //       );
  //       const addSubscriber = await usersModel.findByIdAndUpdate(
  //         { _id: providerid },
  //         { $push: { subscriptions: subscriberid } },
  //         {
  //           returnOriginal: false,
  //         }
  //       );
  //       res.status(201).json({
  //         msg: "added to favorites",

  //       });
  //       console.log("findingFavourites >>>", findingFavourites);
  //     } catch (error) {
  //       res.status(500).json({ msg: "error adding subs" });
  //     }
  //   }
  // } catch (error) {
  //   console.log("error", error);
  //   res.status(500).json({ msg: "user clicking in favourites not found" });
  // }
};

const deleteSubscription = async (req, res) => {
  const { profileid, userid } = req.body;
  console.log("in delete sub");
  console.log("profileid, userid", profileid, userid);

  try {
    // const idOfSub = await subscriptionModel.findOne({})
    const deleteSub = await subscriptionModel.findOneAndDelete({
      sellerid: profileid,
      subscriberid: userid,
    });
    console.log("deleteSub", deleteSub);
    //!user.subscriptions is linked to object_id of subscription from subscritpion collectiion
    const deleteSubscriptionFromUser = await usersModel.findByIdAndUpdate(
      { _id: userid },
      { $pull: { subscriptions: deleteSub._id } },
      { returnOriginal: false }
    );
    const deleteSubscriberFromSeller = await usersModel.findByIdAndUpdate(
      { _id: profileid },
      { $pull: { subscribers: deleteSub._id } },
      { returnOriginal: false }
    );
    res.status(201).json({
      msg: "sub deleted",
    });
  } catch (error) {
    msg: "error in sub deletion";
  }
};

export { createSubscription, deleteSubscription, getSubscription };

// CREATE USER
// const createSubscription = async (req, res) => {
//   const { email, username, password, premium, avatar } = req.body;
//   // TODO: express email vaidation HERE
//   if (!email) {
//     res.send(546);
//   }
//   try {
//     const existingEmail = await usersModel.findOne({ email: req.body.email });
//     const existingUsername = await usersModel.findOne({
//       username: req.body.username,
//     });
//     if (existingEmail) {
//       res.status(403).json({
//         emailError: "account already exists",
//       }); // TODO: RESET PASSWORD
//     } else if (existingUsername) {
//       res.status(403).json({ usernameError: "username taken" });
//     } else {
//       const hashedPassword = await encryptPassword(password);
//       console.log("hashedPassword =", hashedPassword);
//       const newUser = new usersModel({
//         email: email,
//         username: username,
//         password: hashedPassword,
//         premium: premium,
//         avatar: avatar,
//       });
//       try {
//         console.log("trying to save newUser");
//         console.log("newUser", newUser);
//         const savedUser = await newUser.save();
//         res.status(201).json({
//           msg: "user succesfully registered",
//           user: savedUser,
//         });
//       } catch (error) {
//         res.status(500).json({ msg: "something went wrong during signup" });
//       }
//     }
//   } catch (error) {
//     res.status(500).json({
//       msg: "something went wrong during verification",
//     });
//   }
// };
