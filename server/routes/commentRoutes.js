import express from "express";
import {
  // getAllComments,
  createComment,
  deleteComment,
  // getComment,
  // updateComment,
} from "../controllers/commentController.js";

const router = express.Router();

//! code below triggers after we go to "/api/plants/...", as defined in server.js

// GET ALL COMMENTS
// router.get("/all", getAllUsers);

// GET A COMMENT
// router.get("/:username", getComment);
// router.get("/:id", getUser);

// POST COMMENT
router.post("/create", createComment);

// DELETE COMMENT
router.delete("/delete/:id", deleteComment);

// EDIT COMMENT
// router.patch("/update/:id", updateComment);
export default router;
