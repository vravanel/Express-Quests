require("dotenv").config();
const express = require("express");

const app = express();
app.use(express.json());

const port = process.env.APP_PORT ?? 5000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

const userHandlers = require("./userHandlers");
app.get("/api/users", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

const { validateMovie, validateUser } = require("./validators.js");

  
app.post("/api/movies", validateMovie, movieHandlers.postMovie);

app.post("/api/users", validateUser, userHandlers.postUser);

app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);


app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
