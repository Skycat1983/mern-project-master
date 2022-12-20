import express from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getProfile,
  getUser,
  loginUser,
  updateUser,
  updateAccount,
  addRemoveSubscription,
} from "../controllers/userController.js";
import jwtAuth from "../middlewares/jwtAuth.js";

const router = express.Router();

//! code below triggers after we go to "/api/plants/...", as defined in server.js

// GET ALL USERS
router.get("/all", getAllUsers);

// GET A SINGLE USER //! CAREFUL
router.get("/one/:username", getUser);
// router.get("/:id", getUser);

// SIGN UP
router.post("/create", createUser);

// LOGIN
router.post("/login", loginUser);

// VERIFY TOKEN/WRITSTBAND
router.get("/profile", jwtAuth, getProfile);

// DELETE ACCOUNT
router.delete("/delete/:id", deleteUser);

// UPDATE PROFILE (about us)
router.patch("/update/aboutus/:username", updateUser);

// UPDATE SETTINGS //! does this need an id suffix?
router.patch("/update/account", updateAccount);

// UPDATE PROFILE (subscriptions/subscribers)
router.patch("/update/subs/:id", addRemoveSubscription);
export default router;
