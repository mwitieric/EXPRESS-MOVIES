import express from "express";
import { fileURLToPath } from "url";
import path from "path";

let app = express();

let port = 3000;

//construct path to html file
let __fileName = fileURLToPath(import.meta.url);
let __dirName = path.dirname(__fileName);

//home route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirName, "public", "index.html"));
});

// app.get("/movies", (req, res) => {
//   res.sendFile(path.join(__dirName, "public", "movies.html"));
// });

// app.get("/series", (req, res) => {
//   res.sendFile(path.join(__dirName, "public", "series.html"));
// });

//link static files
app.use(express.static("public"));

app.set("views", "./views");
app.set("view engine", "pug");

//movies route
app.get("/movies", async (req, res) => {
  let movieRes = await fetch("https://api.themoviedb.org/3/discover/movie", {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQxM2E2MWE3MzYyNmYxOGU3YThkMjc4ZWY3MmM1NiIsIm5iZiI6MTc0NDM1NzQxNC42MDE5OTk4LCJzdWIiOiI2N2Y4YzgyNmQzYWI3ZDdhOGJhZDdhZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zuMMORASz9E2m_smNO7TUWJw3PUExc9C6yosAzFIZLs",
    },
  });
  let movies = await movieRes.json();
  console.log({ movies });

  // res.sendFile(path.join(__dirName, "public", "movies.html"));

  // res.json(movies);

  res.render("movies", { data: movies.results });
});

// series route
app.get("/series", async (req, res) => {
  let seriesRes = await fetch("https://api.themoviedb.org/3/discover/tv", {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQxM2E2MWE3MzYyNmYxOGU3YThkMjc4ZWY3MmM1NiIsIm5iZiI6MTc0NDM1NzQxNC42MDE5OTk4LCJzdWIiOiI2N2Y4YzgyNmQzYWI3ZDdhOGJhZDdhZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zuMMORASz9E2m_smNO7TUWJw3PUExc9C6yosAzFIZLs",
    },
  });
  let series = await seriesRes.json();
  // console.log({ series });

  res.render("series", { data: series.results });
});

//individual movie route
app.get("/movies/:id", async (req, res) => {
  //fecth  using id

  let id = req.params.id;
  console.log({ id });

  let movieRes = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQxM2E2MWE3MzYyNmYxOGU3YThkMjc4ZWY3MmM1NiIsIm5iZiI6MTc0NDM1NzQxNC42MDE5OTk4LCJzdWIiOiI2N2Y4YzgyNmQzYWI3ZDdhOGJhZDdhZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zuMMORASz9E2m_smNO7TUWJw3PUExc9C6yosAzFIZLs",
    },
  });
  let movie = await movieRes.json();
  console.log({ movie });
  res.render("movie", { data: movie });
});

//individual serie route
app.get("/series/:id", async (req, res) => {
  //fecth
  let id = req.params.id;
  console.log({ id });

  let serieRes = await fetch(`https://api.themoviedb.org/3/tv/${id}`, {
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTQxM2E2MWE3MzYyNmYxOGU3YThkMjc4ZWY3MmM1NiIsIm5iZiI6MTc0NDM1NzQxNC42MDE5OTk4LCJzdWIiOiI2N2Y4YzgyNmQzYWI3ZDdhOGJhZDdhZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zuMMORASz9E2m_smNO7TUWJw3PUExc9C6yosAzFIZLs",
    },
  });
  let serie = await serieRes.json();
  console.log({ serie });

  res.render("serie", { data: serie });
});

app.listen(port, () => {
  console.log(`server running at port ${port}`);
});
