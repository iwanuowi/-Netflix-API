const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

/*  Routes for movies
  GET /movies - list all the movies
  GET /reviews/68941e6d102707f0e637aa72 - get a specific movie
  POST /movies - add new moview 
  PUT /movies/68941e6d102707f0e637aa72 - update movie
  DELETE /movies/68941e6d102707f0e637aa72 - delete movie 
*/

// GET /movies - list all the movies

router.get("/", async (req, res) => {
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
  const movies = await Movie.find(filter).sort({ _id: -1 });
  res.send(movies);
});

//  GET /reviews/68941e6d102707f0e637aa72 - get a specific movie
router.get("/:id", async (req, res) => {
  // retrieve id from params
  const id = req.params.id;
  // load the movie data based on id
  const movie = await Movie.findById(id);
  res.send(movie);
});

/* POST /movies - add new movie
 This POST route need to accept the following parameters:
 - title 
 - director
 - release_year
 - genre
 - rating
*/

// router.post("/", async (req, res) => {
//   try {
//     const title = req.body.title;
//     const director = req.body.director;
//     const release_year = req.body.release_year;
//     const genre = req.body.genre;
//     const rating = req.body.rating;

//     // cheack error - make sur eall the fild are not empty
//     if (!title || !director || !release_year || !genre || !rating) {
//       return res.status(400).send({ message: "Please fill all the fields" });
//     }

//     // create new movie
//     const newMovie = new Movie({
//       title: title,
//       director: director,
//       release_year: release_year,
//       genre: genre,
//       rating: rating,
//     });

//     // save the new movie in mongodb
//     await newMovie.save(); // clicking the "save" button.

//     res.status(201).end(newMovie);
//   } catch (e) {
//     res.status(500).send({ message: "Erorr Unknown" });
//   }
// });
// add new movie
router.post("/", async (req, res) => {
  try {
    const { title, director, release_year, genre, rating } = req.body;

    // Check if all fields are filled
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    // Create new movie
    const newMovie = new Movie({
      title,
      director,
      release_year,
      genre,
      rating,
    });

    // Save to MongoDB
    await newMovie.save();

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({ message: "Unknown Error" });
  }
});

// PUT /movies/68941e6d102707f0e637aa72 - update movie
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id of the movie
    const title = req.body.title;
    const director = req.body.director;
    const release_year = req.body.release_year;
    const genre = req.body.genre;
    const rating = req.body.rating;

    // cheack error - make sur eall the fild are not empty
    if (!title || !director || !release_year || !genre || !rating) {
      return res.status(400).send({ message: "Please fill all the fields" });
    }

    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      {
        title: title,
        director: director,
        release_year: release_year,
        genre: genre,
        rating: rating,
      },
      { new: true }
    );

    res.status(200).send(updatedMovie);
  } catch (e) {
    res.status(500).send({ message: "Unknown Error" });
  }
});

// router.delete("/:id", async (req, res) => {
//   try {
//     const id = req.params.id;
//     const deleteMovie = await Movie.findByIdAndDelete(id);
//     res.status(200).send({
//       message: `id:${id} has successfully been deleted`,
//     });
//   } catch (e) {
//     res.status(500).json({ message: "Unknown Error" });
//   }
// });

// DELETE /movies/68941e6d102707f0e637aa72 - delete movie
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteMovie = await Movie.findByIdAndDelete(id);

    if (!deleteMovie) {
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
