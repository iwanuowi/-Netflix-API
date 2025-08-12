const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

// setup a middleware to handle json request
app.use(express.json());

async function connectToMongoDB() {
  try {
    mongoose.connect("mongodb://localhost:27017/netflix");
    console.log("MongoDB is Connected");
  } catch (error) {
    console.log(error);
  }
}

// trigger the connection with MongoDB
connectToMongoDB();

// /// delcare schema for Movies
// const moviesSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   director: {
//     type: String,
//     required: true,
//   },
//   release_year: {
//     type: Number,
//     required: true,
//   },
//   genre: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
//   newField: Boolean,
// });

// const TVShowSchema = new mongoose.Schema({
//   title: {
//     type: String,
//     required: true,
//   },
//   creator: {
//     type: String,
//     required: true,
//   },
//   premiere_year: {
//     type: Number,
//     required: true,
//   },
//   end_year: {
//     type: Number,
//     required: true,
//   },
//   seasons: {
//     type: Number,
//     required: true,
//   },
//   genre: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number,
//     required: true,
//   },
// });

// // create a Model from teh schema
// const TVShow = mongoose.model("TVShow", TVShowSchema, "tvshow");

//import all the router
const movieRouter = require("./routes/movie");
const tvshowRouter = require("./routes/tvshow");

// setup root route
app.get("/", (req, res) => {
  res.send("HomePage... Happy Coding!");
});

app.use("/movies", movieRouter);
app.use("/tvshows", tvshowRouter);

// stat the express server
app.listen(6969, () => {
  console.log("Your server is running on http://localhost:6969");
});
