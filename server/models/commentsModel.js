import mongoose, { Schema } from "mongoose";

const commentsSchema = new Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    target: { type: Schema.Types.ObjectId, ref: "User" },
    authorusername: { type: String, required: true },
    targetusername: { type: String, required: true },
    // authoravatar: { type: String, required: false },
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("Comment", commentsSchema);

export default commentsModel;
