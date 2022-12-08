// CREATE COMMENT
const createComment = async (req, res) => {
  console.log("create comment", req.body);

  //! TODO: only one review between author and subject
  // // from the user who is logged in
  const { text, rating, author, target } = req.body;

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
    });

    const savedComment = await newComment.save();
    console.log("savedComment", savedComment);

    // const { commentId } = savedComment._id;

    const updateAuthor = await userModel.findOne({ _id: author });
    // console.log("author", author);
    // console.log("updateauthor", updateAuthor);
    // console.log("saved comment", savedComment);
    updateAuthor.commentsby.push(savedComment._id);
    await updateAuthor.save();
    const updateTarget = await userModel.findOne({ _id: target });
    console.log("target", target);
    console.log("updatetarget", updateTarget);
    console.log("saved comment", savedComment);
    updateTarget.commentsfor.push(savedComment._id);
    await updateTarget.save();
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
