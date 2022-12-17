import usersModel from "../models/usersModel.js";
import subscriptionsModel from "../models/usersModel.js";

// pageloads. fave icon is filled or unfilled depending on whether we are subscribed. unfilled = unsubscribed.
const createSubscription = async (req, res) => {
  const { subscriberid, sellerid } = req.body;

  // const existingSubscription = await subscriptionsModel.findById({ _id: subscriberid });
  try {
    const sub = await subscriptionsModel.create({
      sellerid,
      subscriberid,
      plants,
    });

    const findingSubscriber = await usersModel.findById({ _id: subscriberid });
    if (findingSubscriber.subscriptions.length === 0) {
      const findingSubs = await usersModel.findByIdAndUpdate(
        { _id: subscriberid },
        { $push: { subscriptions: sellerid } },
        {
          returnOriginal: false,
        }
      );
      const findingProvider = await usersModel.findById({ _id: sellerid });
      if (findingProvider.subscribers.length === 0) {
        const findingSubs = await usersModel.findByIdAndUpdate(
          { _id: sellerid },
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
            { $pull: { subscriptions: sellerid } },
            {
              returnOriginal: false,
            }
          );
          const removeSubscriber = await usersModel.findByIdAndUpdate(
            { _id: sellerid },
            { $pull: { subscribiers: subscriberid } },
            {
              returnOriginal: false,
            }
          );
          // const deleteSub = await subscribersModel.findByIdAndDelete({
          //   _id: plantid,
          // });
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

export { createSubscription };
