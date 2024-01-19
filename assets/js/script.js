/* OMDB Url: https://www.omdbapi.com/ 
query url: http://www.omdbapi.com/?apikey=[yourkey]&
OMDB query var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";
OMDB API - d3150aaf

Youtube API - AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw
Youtube link to show video, need to add id of a video https://www.youtube.com/watch?v=
var querUrl =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Matrixtrailer&type=video&key=AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw";

//Video ID console.log(data.items[0].id.videoId);



New York times url: https://developer.nytimes.com/
Query to look for movie reviews:
section_name:"Movies" AND type_of_material:"Review"
https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A"Movies" AND type_of_material%3A"Review"&sort=newest&page=0&api-key{your-key}
var querUrl =
"https://api.nytimes.com/svc/search/v2/articlesearch.json?q=The%20Matrix&fq=section_name:Movies&type_of_material:Review&sort=newest&page=0&api-key=v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb";


API - v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb
*/

// var querUrl =
//   "https://www.googleapis.com/youtube/v3/search?part=snippet&q=TheMatrixtrailer&type=video&key=AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw";

// OMDB query var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";

var searchInput = $("#search-input");
var searchBtn = $("#search-btn");
var movieSortTitle = $("#movie-sort-title");
var movieSortOptions = $("#movie-sort-options");
var movieCards = $("#movies-thumb-cards");

var movieInfo = $("#movie-info");

/* -----------------------
        Functions
   ----------------------- */
var fetchMovieByTitle = (title) => {
  var querUrl = `http://www.omdbapi.com/?apikey=d3150aaf&t=${title}`;

  fetch(querUrl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      // Title - console.log(data.Title);
      // Release yearconsole.log(data.Year);
      // Runtime in minutes console.log(data.Runtime);
      // Age rating console.log(data.Rated);
      // ImdbRating console.log(data.imdbRating);
      console.log(data.Genre);
      // Movie plot console.log(data.Plot);
      //Boxoffice new console.log(data.BoxOffice)
      // Movie directors console.log(data.Director);
      // Movie Actors console.log(data.Actors);
      // Writers console.log(data.Writer);
      // Poster image url console.log(data.Poster);
      movieInfo.empty();

      var movieTitle = $(`<h2>${data.Title}</h2>`);
      var movieMeta = $(
        `<ul><li>${data.Year}</li><li>${data.Rated}</li><li>${data.Runtime}</li></ul>`
      );
      var moviePoster = $(`<img src="${data.Poster}" alt="Movie poster">`);
      // Movie genres array
      var movieGenresArr = data.Genre.split(", ");

      movieInfo.append(movieTitle, movieMeta, moviePoster);
      // Movie genres array, create buttons and append to movieInfo section
      movieGenresArr.forEach((genre) => {
        var genreBtn = $(`<button>${genre}</button>`);
        movieInfo.append(genreBtn);
      });
      var moviePlot = $(`<p>${data.Plot}</p>`);
      var movieDirector = $(`<p>Director(s): ${data.Director}</p>`);
      var movieWriters = $(`<p>Writer(s): ${data.Writer}</p>`);
      var movieActors = $(`<p>Actor(s): ${data.Actors}</p>`);
      movieInfo.append(moviePlot, movieDirector, movieWriters, movieActors);
      console.log(data);
    });
};

// Fetch movies from TMDB by serch criteria
var fetchMovies = function () {
  // Top movies
  queryUrlPopular =
    "https://api.themoviedb.org/3/discover/movie?api_key=bdc89408c9f3fc4ec6ef3b8781672df0&sort_by=vote_average.desc&vote_count.gte=25000";
  // Top movies with PG restriction
  queryUrlPG =
    "https://api.themoviedb.org/3/discover/movie?api_key=bdc89408c9f3fc4ec6ef3b8781672df0&sort_by=vote_average.desc&vote_count.gte=15000&certification_country=US&certification=PG";

  //Future releases
  queryUrlNewRelease =
    "https://api.themoviedb.org/3/discover/movie?api_key=bdc89408c9f3fc4ec6ef3b8781672df0&primary_release_date.gte=2024-01-19";
  if (movieSortOptions.val() === "1") {
    fetch(queryUrlPopular)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data.results);
      });
  }
  if (movieSortOptions.val() === "2") {
    fetch(queryUrlPG)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data.results);
      });
  }
  if (movieSortOptions.val() === "3") {
    fetch(queryUrlNewRelease)
      .then((resp) => {
        return resp.json();
      })
      .then((data) => {
        console.log(data.results);
      });
  }
};
fetchMovies();
// On Search button click fetch data about movies from OMDB
searchBtn.on("click", function () {
  if (searchInput.val() !== "") {
    fetchMovieByTitle(searchInput.val());
  }
});

movieSortOptions.on("change", function () {
  fetchMovies();
});
