import mongoose, { Schema } from "mongoose";
// import { stringify } from "querystring";

const factSchema = new Schema({
  genus: { type: String, required: true },
  difficulty: { type: Number, required: true },
  toxicity: { type: Boolean, required: true },
  humidity: { type: Number, required: true },
  origin: { type: String, required: true },
  directsunlight: { type: String, required: true },
  about: { type: String, required: true },
  // user: { type: Schema.Types.ObjectId, ref: "User" },
  // fact: { type: Schema.Types.ObjectId, ref: "Fact" },
});

//! model is based on the schema. the schema decsribes the structure. the model applies it to interact withclear a collection of that name
//* "Plant" references my plants collection
const factModel = mongoose.model("Fact", factSchema);

export default factModel;
