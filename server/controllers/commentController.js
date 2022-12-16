import commentsModel from "../models/commentsModel.js";
import userModel from "../models/usersModel.js";

// CREATE COMMENT
const createComment = async (req, res) => {
  console.log("create comment", req.body);

  //! TODO: only one review between author and subject
  // // from the user who is logged in
  const { text, rating, author, target, authorusername, targetusername } =
    req.body;

  // // the profile we are on is the target
  // const { target } = req.params;

  console.log("text:>>>", text);
  console.log("rating:>>>", rating);
  console.log("author:>>>", author);
  console.log("target:>>>", target);

  try {
    //? not sure if it's better to search the comments collection or the users array of reviews
    // const existingComment = await commentsModel.find({ author: author });
    // const existingTarget = await usersModel.findOne({

    const newComment = await commentsModel.create({
      text: text,
      rating: rating,
      author: author,
      target: target,
      authorusername: authorusername,
      targetusername: targetusername,
    });

    const savedComment = await newComment.save();
    console.log("savedComment", savedComment);

    const updateAuthor = await userModel.findByIdAndUpdate(
      { _id: author },
      { $push: { commentsby: savedComment._id } },
      { returnOriginal: false }
    );
    console.log("updateAuthor :>> ", updateAuthor);
    console.log("savedComment", savedComment);
    const updateTarget = await userModel.findByIdAndUpdate(
      { _id: target },
      { $push: { commentsfor: savedComment._id } },
      { returnOriginal: false }
    );
    console.log("updateTarget :>> ", updateTarget);

    //! pull instead of push to remove

    res.status(201).json({
      msg: "comment succesfully registered",
      comment: savedComment,
      updateAuthor,
      updateTarget,
    });
  } catch (error) {
    res.status(500).json({ msg: "something went wrong with comment creation" });
  }
};

//! V1 const commentby = await userModel.findByIdAndUpdate(
//! V2 const commentby = await userModel.findByIdAndDelete(

const deleteComment = async (req, res) => {
  const { commentid, authorid, targetid } = req.body;
  console.log("commentid, authorid, targetid", commentid, authorid, targetid);
  try {
    // maybe should be //? findOneAndDelete
    const comment = await commentsModel.findByIdAndDelete({ _id: commentid });
    // const commentby = await userModel.findByIdAndDelete(
    const auth = await userModel.findByIdAndUpdate(
      { _id: authorid },
      { $pull: { commentsby: commentid } },
      { returnOriginal: false }
    );
    // const commentfor = await userModel.findByIdAndDelete(
    const targ = await userModel.findByIdAndUpdate(
      { _id: targetid },
      { $pull: { commentsfor: commentid } },
      { returnOriginal: false }
    );

    // console.log("deleted comment", comment);
    res.status(200).json({
      msg: "comment succesfully deleted",
    });
  } catch (error) {
    console.log("error :>> ", error);
    res.status(500).json({
      error,
      msg: "there was a problem in the server",
    });
  }
};

export { createComment, deleteComment };
