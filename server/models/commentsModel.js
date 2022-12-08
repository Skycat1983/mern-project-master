import mongoose, { Schema } from "mongoose";

const commentsSchema = new Schema(
  {
    text: { type: String, required: true },
    rating: { type: Number, required: true },
    author: { type: Schema.Types.ObjectId, ref: "User" },
    target: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

const commentsModel = mongoose.model("Comment", commentsSchema);

export default commentsModel;
