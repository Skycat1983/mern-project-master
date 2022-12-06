import mongoose, { Schema } from "mongoose";
// import { stringify } from "querystring";

const plantSchema = new Schema(
  {
    //! PLANT DEETS
    genus: { type: String, required: true },
    // dateposted: { type: Date, default: Date.now },
    // requirements: String,

    //! SELLER DEETS
    // username: { type: String, required: true },
    // location: {
    //   longtitude: {
    //     type: Number,
    //   },
    //   latitude: {
    //     type: Number,
    //   },
    // },

    //! SAMPLE DEETS
    varigation: { type: Boolean, required: true },
    rooted: { type: Boolean, required: true },
    topcutting: { type: Boolean, required: true },
    imageUrls: { type: Array, required: true },
    // nodes: { type: Number },
    // height: { type: Number, required: true },
    // width: { type: Number, required: true },
    // passport: { type: Boolean, required: true },
    // additonalinfo: { type: String },
    // wishlist: Number,
    price: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },

    // user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//! model is based on the schema. the schema decsribes the structure. the model applies it to interact withclear a collection of that name
//* "Plant" references my plants collection
const plantModel = mongoose.model("Plant", plantSchema);

export default plantModel;
