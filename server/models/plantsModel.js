import mongoose, { Schema } from "mongoose";

const plantSchema = new Schema(
  {
    //! PLANT DEETS
    genus: { type: String, required: true },

    //! SAMPLE DEETS
    varigation: { type: Boolean, required: true },
    rooted: { type: Boolean, required: true },
    topcutting: { type: Boolean, required: true },
    imageUrls: { type: Array, required: true },
    publicIds: { type: Array, required: true },
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
    fact: { type: Schema.Types.ObjectId, ref: "Fact" },
  },
  { timestamps: true }
);
const plantModel = mongoose.model("Plant", plantSchema);

export default plantModel;
