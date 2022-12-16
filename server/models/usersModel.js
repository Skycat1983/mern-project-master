import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    premium: { type: Boolean, required: true },
    avatar: { type: String, required: true },
    aboutus: { type: String, required: false },
    coverpicture: { type: String, required: false },
    subscriptions: { type: Array, required: false },
    subscribers: { type: Array, required: false },
    commentsfor: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentsby: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }], //! ref: "plant" = the collection name in mongodb. must be singular
    // wishlist: { type: Object, required: false },
  },
  { timestamps: true }
);

const usersModel = mongoose.model("User", usersSchema);

export default usersModel;

// 51.557040137852745, -0.02915755416881117;

// populate({ path: "plants" });

// latitude: { type: Number, required: false },
// longtitude: { type: Number, required: false },
// comments: { type: Object, required: false },
