import mongoose, { Schema } from "mongoose";

const subscriptionSchema = new Schema(
  {
    sellerid: { type: Schema.Types.ObjectId, ref: "User" },
    subscriberid: { type: Schema.Types.ObjectId, ref: "User" },
    plants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plant" }],
  },
  { timestamps: true }
);

const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default subscriptionModel;
