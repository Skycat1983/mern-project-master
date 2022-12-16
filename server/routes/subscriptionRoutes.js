import express from "express";
// import subscriptionsModel from "../models/subscriptionsModel.js";
import { createSubscription } from "../controllers/subscriptionController.js";

const router = express.Router();

// CREATE A SUBSCRIPTION
router.post("/create", createSubscription);

// UPDATE A NEW PLANT
// router.patch("/update/:id", updatePlant);
export default router;
