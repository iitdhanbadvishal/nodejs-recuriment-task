const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const Movi = require("./models/movies");
const { verifyAccessToken } = require("./middleware/auth");
const cors = require("cors");
const { capitalizeFirstLetter } = require("./utils/utils");

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/movies", async (req, res) => {
  try {
    // if (!req.body) {
    //   return res.status(400).json({ error: "No body found" });
    // }

    // const { userId, role } = req.payload;
    const userId = "test";
    const role = "basic";
    console.log("req", req.body);
    const { movieTitle } = req.body;

    if (!movieTitle) {
      return res.status(400).json({ error: "Enter movi title" });
    }
    console.log("0");
    const createdTime = Math.round(new Date().getTime());
    var date = new Date(createdTime);
    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    if (role === "basic") {
      console.log("1");
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
    console.log("2");
    const moviDetails = await axios.get(
      `http://www.omdbapi.com/?apikey=2c46c474&t=${movieTitle}`
    );

    if (moviDetails.data.Response == "False") {
      return res.status(400).json({ message: "Movie not found!" });
    }
    console.log("3");
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
    console.log("5", error.message);
    return res.status(500).json({ error: error.message });
  }
});

app.get("/movies", async (req, res) => {
  try {
    const { userId } = req.payload;

    const createdMovies = await Movi.find({ userId }).sort("createdAt");
    res.json(createdMovies);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.get("/test", (req, res) => {
  return res.status(200).send({ message: "success" });
});

app.get("/test2", async (req, res) => {
  try {
    const moviDetails = await axios.get(
      `http://www.omdbapi.com/?apikey=${process.env.API_KEY}&t=$no entry`
    );
    const { Title } = moviDetails.data;
    if (Title === "No Entry") {
      return res.status(200).send({ message: "success" });
    } else {
      return res.status(500).send({ message: "fail" });
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

module.exports = app;
