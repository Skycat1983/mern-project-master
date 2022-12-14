import mongoose, { Schema } from "mongoose";
// import { stringify } from "querystring";

const plantSchema = new Schema(
  {
    //! PLANT DEETS
    genus: { type: String, required: true },

    //! SAMPLE DEETS
    varigation: { type: Boolean, required: true },
    rooted: { type: Boolean, required: true },
    topcutting: { type: Boolean, required: true },
    imageUrls: { type: Array, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    fact: { type: Schema.Types.ObjectId, ref: "Fact" },
    // user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//! model is based on the schema. the schema decsribes the structure. the model applies it to interact withclear a collection of that name
//* "Plant" references my plants collection
const plantModel = mongoose.model("Plant", plantSchema);

export default plantModel;
