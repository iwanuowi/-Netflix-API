const { Schema, model } = require("mongoose");

const tvshowSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: String,
    required: true,
  },
  premiere_year: {
    type: Number,
    required: true,
  },
  end_year: {
    type: Number,
    required: true,
  },
  seasons: {
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
});
const TvShow = model("Tvshow", tvshowSchema, "tvshow");

module.exports = TvShow;
