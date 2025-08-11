const express = require("express");
// import mongoose
const mongoose = require("mongoose");

// setup an express app
const app = express();

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

/// delcare schema for Movies
const moviesSchema = new mongoose.Schema({
  title: String,
  director: String,
  release_year: Number,
  genre: String,
  rating: Number,
  newField: Boolean,
});

const TVShowSchema = new mongoose.Schema({
  title: String,
  creator: String,
  premiere_year: Number,
  end_year: Number,
  seasons: Number,
  genre: String,
  rating: Number,
});

// create a Model from teh schema
const Movie = mongoose.model("Movie", moviesSchema);
const TVShow = mongoose.model("TVShow", TVShowSchema, "tvshow");

// setup root route
app.get("/", (req, res) => {
  res.send("Happy Coding!");
});

/*  Routes for movies
  GET /movies - list all the movies
  GET /reviews/68941e6d102707f0e637aa72 - get a specific movie
  POST /movies - add new moview 
  PUT /movies/68941e6d102707f0e637aa72 - update movie
  DELETE /movies/68941e6d102707f0e637aa72 - delete movie 
*/
/*
  GET /movies - list all the movies
*/
/*
  GET /reviews/68941e6d102707f0e637aa72 - get a specific movie
*/
app.get("/movies", async (req, res) => {
  const director = req.query.director;
  const genre = req.query.genre;
  const rating = req.query.rating;

  // create a container for filter
  let filter = {};
  // if director exists, then only add it into the filter container
  if (director) {
    filter.director = director;
  }
  // if genre exists, then only add it into the filter conatiner
  if (genre) {
    filter.genre = genre;
  }
  // if rating exists, then only add it into the filter container
  if (rating) {
    filter.rating = { $gt: rating };
  }

  // load the movies from the Mongodb
  const movies = await Movie.find(filter);
  res.send(movies);
});

app.get("/tvshow", async (req, res) => {
  const genre = req.query.genre;
  const rating = req.query.rating;
  const premiere_year = req.query.premiere_year;

  let filter = {};

  if (genre) {
    filter.genre = genre;
  }

  if (rating) {
    filter.rating = { $gt: rating };
  }

  if (premiere_year) {
    filter.premiere_year = { $gt: premiere_year };
  }

  const tvShows = await TVShow.find(filter);
  res.send(tvShows);
});

app.get("/tvshow/:id", async (req, res) => {
  const id = req.params.id;
  const show = await TVShow.findById(id);
  res.send(show);
});

//  GET /reviews/68941e6d102707f0e637aa72 - get a specific movie
app.get("/movies/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

// stat the express server
app.listen(6969, () => {
  console.log("Your server is running on http://localhost:6969");
});
