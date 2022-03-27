const express = require("express");
const axios = require("axios");
const Movi = require("./models/movies");
const { verifyAccessToken } = require("./middleware/auth");
const { capitalizeFirstLetter } = require("./utils/utils");

const app = express();

app.post("/movies", verifyAccessToken, async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ error: "No body found" });
    }

    const { userId, role } = req.payload;
    const { movieTitle } = req.body;

    if (!movieTitle) {
      return res.status(400).json({ error: "Enter movi title" });
    }

    const createdTime = Math.round(new Date().getTime());
    var date = new Date(createdTime);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (role === "basic") {
      let numberOfMovieCreatedPerMonth = await Movi.find({
        userId: userId,
        month: month,
        year: year,
      });
      if (numberOfMovieCreatedPerMonth.length > 5) {
        return res.status(400).json({
          message: `You are a basic user, you can create only 5 movies per month`,
        });
      }
    }

    let moviExist = await Movi.count({
      userId: userId,
      title: capitalizeFirstLetter(movieTitle),
    });
    if (moviExist > 0)
      return res
        .status(400)
        .json({ message: `Already created movie with title ${movieTitle}` });

    const moviDetails = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=${movieTitle}`
    );

    if (moviDetails.data.Response == "False") {
      return res.status(400).json({ message: "Movie not found!" });
    }

    const { Title, Released, Genre, Director } = moviDetails.data;

    const movi = new Movi({
      userId,
      title: Title,
      released: Released,
      genre: Genre,
      director: Director,
      createdAt: createdTime,
      month,
      year,
    });
    await movi.save();

    res
      .status(200)
      .json({ message: `Successfully created a movie with title ${Title}` });
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
});

app.get("/movies", verifyAccessToken, async (req, res) => {
  try {
    const { userId } = req.payload;

    const createdMovies = await Movi.find({ userId }).sort("createdAt");
    res.json(createdMovies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/test",(req,res) => {
    return res.status(200).send({message:"success"})
})

module.exports = app;
