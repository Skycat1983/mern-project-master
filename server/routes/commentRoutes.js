import express from "express";

import {
  getAllUsers,
  createUser,
  deleteUser,
  getUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

//! code below triggers after we go to "/api/plants/...", as defined in server.js

// GET ALL USERS
// router.get("/all", getAllUsers);

// GET A COMMENT
router.get("/:username", getUser);
// router.get("/:id", getUser);

// POST COMMENT
router.post("/create", createUser);

// DELETE COMMENT
router.delete("/delete/:id", deleteUser);

// EDIT COMMENT
router.patch("/update/:id", updateUser);
export default router;
