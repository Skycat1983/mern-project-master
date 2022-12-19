import express from "express";
// import subscriptionsModel from "../models/subscriptionsModel.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// GET A SUBSCRIPTION
router.get("/get", getSubscription);

// CREATE A SUBSCRIPTION
router.post("/create", createSubscription);

// DELETE A SUBSCRIPTION
router.delete("/delete", deleteSubscription);

// UPDATE A NEW PLANT
// router.patch("/update/:id", updatePlant);
export default router;
