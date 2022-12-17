import mongoose, { Schema } from "mongoose";
// import { stringify } from "querystring";

const subscriptionSchema = new Schema(
  {
    // plants: { type: Array, Schema.Types.ObjectId, ref: "User" },
    // plants: { type: Array, required: false },
    plants: [
      {
        plant: { type: mongoose.Schema.Types.ObjectId, ref: "Plant" },
      },
    ],
    sellerid: { type: Schema.Types.ObjectId, ref: "User" },
    subscriberid: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//! model is based on the schema. the schema decsribes the structure. the model applies it to interact withclear a collection of that name
//* "Plant" references my plants collection
const subscriptionModel = mongoose.model("Subscription", subscriptionSchema);

export default subscriptionModel;
