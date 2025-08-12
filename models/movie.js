const { Schema, model } = require("mongoose");

const moviesSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  release_year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  newField: Boolean,
});
const Movie = model("Movie", moviesSchema);

module.exports = Movie;
