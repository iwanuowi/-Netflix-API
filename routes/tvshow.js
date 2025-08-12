const express = require("express");
const router = express.Router();
const Tvshow = require("../models/tvshow");

// GET /tvshow - list tv shows with optional filters
router.get("/", async (req, res) => {
  const { genre, rating, premiere_year } = req.query;

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

  const tvShows = await Tvshow.find(filter);
  res.send(tvShows);
});

// GET /tvshow/:id - get specific tv show
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const show = await Tvshow.findById(id);
  res.send(show);
});

// POST /tvshow
router.post("/", async (req, res) => {
  try {
    const { title, creator, premiere_year, end_year, seasons, genre, rating } =
      req.body;

    if (
      !title ||
      !creator ||
      !premiere_year ||
      !end_year ||
      !seasons ||
      !genre ||
      !rating
    ) {
      return res.status(400).json({ message: "Please fill up the fields" });
    }

    const newTvshow = new Tvshow({
      title,
      creator,
      premiere_year,
      end_year,
      seasons,
      genre,
      rating,
    });

    await newTvshow.save();
    res.status(200).send(newTvshow);
  } catch (e) {
    res.status(500).json({ message: "Unknown Error" });
  }
});

// PUT /tvshow/:id
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { title, creator, premiere_year, end_year, seasons, genre, rating } =
      req.body;

    if (
      !title ||
      !creator ||
      !premiere_year ||
      !end_year ||
      !seasons ||
      !genre ||
      !rating
    ) {
      return res.status(400).json({ message: "Please fill up the fields" });
    }

    const updatedTvshow = await Tvshow.findByIdAndUpdate(
      id,
      { title, creator, premiere_year, end_year, seasons, genre, rating },
      { new: true }
    );

    if (!updatedTvshow) {
      return res.status(404).json({ message: "TV Show not found" });
    }

    res.status(200).json(updatedTvshow);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Unknown Error" });
  }
});

// DELETE /tvshow.:id
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteTvshow = await Tvshow.findByIdAndDelete(id);

    if (!deleteTvshow) {
      return res.status(404).json({ message: `Movie with id:${id} not found` });
    }
    res.status(200).json({
      message: `id:${id} has successfully been deleted`,
    });
  } catch (e) {
    res.status(500).json({ message: "Unknown Error" });
  }
});

module.exports = router;
