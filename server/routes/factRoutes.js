import express from "express";
import { getFact, getAllFacts } from "../controllers/factController.js";

const router = express.Router();

// GET ALL PLANTS
router.get("/all", getAllFacts);

// GET A SINGLE FACT
router.get("/id/:id", getFact);

export default router;
