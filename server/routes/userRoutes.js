import express from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//! code below triggers after we go to "/api/plants/...", as defined in server.js

// GET ALL USERS
router.get("/all", getAllUsers);

// GET A SINGLE USER
router.get("/:username", getUser);
// router.get("/:id", getUser);

// SIGN UP
router.post("/create", createUser);

// LOGIN
router.post("/login", loginUser);

// DELETE ACCOUNT
router.delete("/delete/:id", deleteUser);

// UPDATE PROFILE
router.patch("/update/:username", updateUser);
export default router;
