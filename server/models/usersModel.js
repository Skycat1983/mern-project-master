import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    //! SELLER DEETS
    // _id: { type: ObjectId },

    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    premium: { type: Boolean, required: true },
    avatar: { type: String, required: true },

    // latitude: { type: Number, required: false },
    // longtitude: { type: Number, required: false },
    // comments: { type: Object, required: false },
    comments: [
      {
        author: {
          type: String,
          required: false,
        },
        text: {
          type: String,
          required: false,
        },
      },
    ],
    // _id: { type: mongoose.ObjectId },
    plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }], //! ref: "plant" = the collection name in mongodb. must be singular
    // wishlist: { type: Object, required: false },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("User", usersSchema);

export default usersModel;

// 51.557040137852745, -0.02915755416881117;

// populate({ path: "plants" });
