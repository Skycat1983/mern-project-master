import express from "express";
// import subscriptionsModel from "../models/subscriptionsModel.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getMySubscriptions,
} from "../controllers/subscriptionController.js";

const router = express.Router();

// GET A SUBSCRIPTION
router.post("/get", getSubscription);

// GET ALL MY SUBSCRIPTIONS
router.post("/all", getMySubscriptions);

// CREATE A SUBSCRIPTION
router.post("/create", createSubscription);

// DELETE A SUBSCRIPTION
router.delete("/delete", deleteSubscription);

// UPDATE A NEW PLANT
// router.patch("/update/:id", updatePlant);
export default router;
