import express from "express";

const router = express.Router();

// post = store, delete = delete
router.get("/test", (req, res) => {
  //*  request (from front end), response (what we send to front end)
  res.json("Test route.");
  // res.send({ msg: "Test route." });
});
export default router;
