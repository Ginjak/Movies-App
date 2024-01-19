/* OMDB Url: https://www.omdbapi.com/ 
query url: http://www.omdbapi.com/?apikey=[yourkey]&
OMDB query var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";
OMDB API - d3150aaf
*/

var searchInput = $("#search-input");
var searchBtn = $("#search-btn");
var movieSortTitle = $("#movie-sort-title");
var movieSortOptions = $("#movie-sort-options");
var movieCards = $("#movies");

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
// Function to create movie cards
function createMovieCards(data) {
  movieCards.empty();

  for (var i = 0; i < 8; i++) {
    var card =
      $(`<div class="col" id="movies-thumb-cards" style="border: 1px, solid; border-radius: 10px;">
      <div class="card row-cols-1" style="max-width:fit-content;">
      <div class="row d-flex align-items-center g-0">
      <div class="col-md-4 h-auto col-sm-4">
            <img src="https://image.tmdb.org/t/p/w200/${data.results[i].poster_path}" class="img-fluid p-2" alt="Movie poster" />
          </div>
          <div class="col-md-8 col-sm-8">
            <div class="card-body">
              <h5 class="card-title">${data.results[i].title}</h5>
              <p id="rating" class="card-text"><i class="fa-solid fa-star"></i>${data.results[i].vote_average}</p>
              <p class="card-text">
                <small class="text-muted">${data.results[i].release_date}</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>`);

    movieCards.append(card);
  }
}

// Fetch movies based on selected option
function fetchMovies() {
  var apiKey = "bdc89408c9f3fc4ec6ef3b8781672df0";
  var movieSortOptions = $("#movie-sort-options");

  // Function to fetch movies by url
  function fetchMoviesByUrl(url) {
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => createMovieCards(data));
  }
  // Most popular movies
  if (movieSortOptions.val() === "1") {
    fetchMoviesByUrl(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&sort_by=vote_average.desc&vote_count.gte=25000"
    );
    movieSortTitle.text("Most Popular");
  }
  // Movies for kids with PG certificate
  if (movieSortOptions.val() === "2") {
    fetchMoviesByUrl(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&sort_by=vote_average.desc&vote_count.gte=15000&certification_country=US&certification=PG"
    );
    movieSortTitle.text("Most Popular for kids");
  }
  // Future releases
  if (movieSortOptions.val() === "3") {
    fetchMoviesByUrl(
      "https://api.themoviedb.org/3/discover/movie?api_key=" +
        apiKey +
        "&primary_release_date.gte=2024-01-19"
    );

    movieSortTitle.text("Upcoming Releases");
  }
}
fetchMovies();
// On Search button click fetch data about movies from OMDB
searchBtn.on("click", function () {
  if (searchInput.val() !== "") {
    fetchMovieByTitle(searchInput.val());
    $("html, body").animate(
      {
        scrollTop: $("#movie-details").offset().top,
      },
      200
    );
  }
});

movieSortOptions.on("change", function () {
  fetchMovies();
});

/* ---------------
Tomaz code
---------------- */

// Initial References
let movieNameRef = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");
let result = document.getElementById("movie-details");

// Add your YouTube Data API key here
const youtubeKey = "AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw";

// Function to fetch YouTube videos related to the movie
let getYoutubeVideos = (movieName) => {
  return new Promise((resolve, reject) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName} trailer&key=${youtubeKey}`;

    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If videos exist
        if (data.items.length > 0) {
          const videoUrl = `https://www.youtube.com/embed/${data.items[0].id.videoId}`;
          resolve(videoUrl);
        } else {
          reject("No videos found");
        }
      })
      .catch(() => {
        reject("Error Occurred While Fetching YouTube Videos");
      });
  });
};

// Function to fetch data from API
const key = "2bd71b72";
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  // If input field is empty

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      // If movie exists in database
      if (data.Response == "True") {
        result.innerHTML = `
            <div class="info">

                <img src=${data.Poster} class="poster">
                <div id="youtube-trailer">
                </div>
                <div>
                    <h2>${data.Title}</h2>
                    <div class="rating">
                    <span style="font-size:300%;color:yellow;">&starf;</span>
                        <h4>${data.imdbRating}</h4>
                    </div>
                    <div class="details">
                        <span>${data.Rated}</span>
                        <span>${data.Year}</span>
                        <span>${data.Runtime}</span>
                        
                    </div>
                    <div class="genre">
                        <div>${data.Genre.split(",").join("</div><div>")}</div>
                        
                    </div>
                </div>
            </div>
            <h3>Plot:</h3>
            <p>${data.Plot}</p>
            <h3>Cast:</h3>
            <p>${data.Actors}</p>
          `;
        getYoutubeVideos(movieName)
          .then((videoUrl) => {
            // Append the YouTube video URL to the 'test' paragraph
            $("#youtube-trailer").append(`
            <iframe width="560" height="315" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
      `);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
};

searchButton.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);
