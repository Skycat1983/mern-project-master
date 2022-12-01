import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import plantRoutes from "./routes/plantRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cloudinaryConfig from "./config/cloudinary.js";

// EXPRESS APP
const app = express();

const port = process.env.PORT || 5002;

// MIDDLEWARE
const addMiddleWares = () => {
  app.use(express.json());
  app.use(
    express.urlencoded({
      extended: true,
    })
  );
  const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true,
  };
  app.use(cors(corsOptions));
  cloudinaryConfig();
};

const startServer = () => {
  app.listen(port, () => {
    console.log("Server is running in port " + port);
  });
};

// ROUTES (when we fire a request to "location", we use plantRoutes)
const loadRoutes = () => {
  app.use("/api/plants", plantRoutes);
  app.use("/api/users", userRoutes);
};

//  connect to DB
const mongoDBConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB is running in port :>> ", port);
  } catch (error) {
    console.log("error connecting to MongoDB", error);
  }
};

(async function controller() {
  await mongoDBConnection();
  addMiddleWares();
  loadRoutes();
  startServer();
})();

//! see usercontroller. .findOne({ username: username }) CONFUSING!

//?  what is significane in url differences between front annd backend routing?

//? not getting errors when i register with postman, despite requirement of unique identifier on email
//? see controllers: mentions of allUsers.length but in every const. needs to be addressed. not sure of meaning
//? i have lost track of how info flows from
//! see usersmodel. why does ref: "Plant" need capital letter?

//? line 36. not sure if it should be plantRoutes or router?

// LISTEN FOR REQUESTS
// const port = process.env.PORT || 5001;

// 1443 conciurrently
// const mongoose = require("mongoose");
