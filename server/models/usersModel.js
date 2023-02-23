import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    premium: { type: Boolean, required: true },
    currency: { type: String, required: false },
    language: { type: String, required: false },
    avatar: { type: String, required: true },
    aboutus: { type: String, required: false },
    coverpicture: { type: String, required: false },
    subscriptions: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],
    subscribers: [{ type: Schema.Types.ObjectId, ref: "Subscription" }],

    commentsfor: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    commentsby: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
    plants: [{ type: Schema.Types.ObjectId, ref: "Plant" }], //! ref: "plant" = the collection name in mongodb. must be singular
  },
  { timestamps: true }
);

const usersModel = mongoose.model("User", usersSchema);

export default usersModel;
