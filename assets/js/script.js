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
var currentDay = dayjs().format("YYYY-MM-DD");
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
    var posterPath = data.results[i].poster_path;
    var imgSrc = posterPath
      ? `https://image.tmdb.org/t/p/w200/${posterPath}`
      : "/assets/img/No_image.png";
    var card =
      $(`<div class="col" id="movies-thumb-cards" style="border: 1px, solid; border-radius: 10px;">
      <div class="card row-cols-1" style="max-width:fit-content;">
      <div class="row d-flex align-items-center g-0">
      <div class="col-md-4 h-auto col-sm-4">
            <img src="${imgSrc}" class="img-fluid p-2" alt="Movie poster" />
          </div>
          <div class="col-md-8 col-sm-8">
            <div class="card-body">
              <h5 id="sort-card-title" data-title="${
                i + 1
              }" class="card-title">${data.results[i].title}</h5>
              <p id="rating" class="card-text"><i class="fa-solid fa-star"></i>${
                data.results[i].vote_average
              }</p>
              <p class="card-text">
                <small class="text-muted">${
                  data.results[i].release_date
                }</small>
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
  var threeMonthsFromToday = dayjs().add(3, "month").format("YYYY-MM-DD");

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
        "&primary_release_date.gte=" +
        currentDay +
        "&primary_release_date.lte=" +
        threeMonthsFromToday +
        "&sort_by=primary_release_date.asc"
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
      1000
    );
  }
});

var test = function () {
  $("#movies-thumb-cards .card").addClass("test");
};
movieSortOptions.on("change", function () {
  fetchMovies();
  setTimeout(function () {
    if (movieSortOptions.val() === "3") {
      $("#movies-thumb-cards .card").css("cursor", "not-allowed");
    }
  }, 500);
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
let getMovie = (title) => {
  let url = `https://www.omdbapi.com/?t=${title}&apikey=${key}`;
  // If input field is empty

  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      // If movie exists in database
      if (data.Response == "True") {
        result.innerHTML = `
            <div class="info container-xxl">
              <div class="row">
                <div class="col-12 position-relative">
                  <h2 class="text-start d-flex">${data.Title}</h2>
                  <button id="favorites-btn" class="d-flex flex-column" title="Add To Favorites"><i class="fa-regular fa-star"></i></button>
                  <div class="meta">
                      <span class="text-start">${data.Year}</span>
                      <span class="text-start">${data.Rated}</span>
                      <span class="text-start">${data.Runtime}</span>   
                      <span class="text-start">${data.imdbRating}</span>
                  </div>
                </div>
               </div>   
                <div class="row">
                  <div class="col-12 d-flex position-relative">
                  <img src=${data.Poster} class="img-fluid poster">
                  <div id="youtube-trailer">
                  </div>
                </div>                   
                    
              <div class="row">
              <div class="col-12 d-flex">
                        <div class="px-2">${data.Genre.split(",").join(
                          "</div><div class='px-2'>"
                        )}</div>
              </div>
                        
              </div>
            </div>
            <div class="row">
            <div class="col-12">           
            <p>${data.Plot}</p>
            <p><span>Director(s): </span>${data.Director}</p>
            <p><span>Writer(s): </span>${data.Writer}</p>
            <p><span>Actors: </span>${data.Actors}</p>
            </div>
            </div>
            
          `;
        console.log(data);
        movieReviews(data.Title.split(" ").join("+"));
        getYoutubeVideos(data.Title)
          .then((videoUrl) => {
            // Append the YouTube video URL to the 'test' paragraph
            $("#youtube-trailer").append(`
            <iframe width="100%" height="100%" src="${videoUrl}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
      `);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    });
};

searchBtn.on("click", function () {
  getMovie(searchInput.val());
});

var querUrl =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=rambo&fq=section_name:Movies&type_of_material:Review&sort=newest&page=0&api-key=v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb";

function movieReviews(movietitle) {
  console.log(movietitle);
  var querUrl =
    "https://api.themoviedb.org/3/search/movie?query=" +
    movietitle +
    "&api_key=c9496f893f42d58d46a50e1820b050e8";
  //'https://api.themoviedb.org/3/movie/1771?api_key=c9496f893f42d58d46a50e1820b050e8'
  console.log(querUrl);

  fetch(querUrl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      var movieId = data.results[0].id;
      console.log(movieId);
      var reviewUrl =
        "https://api.themoviedb.org/3/movie/" +
        movieId +
        "/reviews?api_key=c9496f893f42d58d46a50e1820b050e8";
      fetch(reviewUrl)
        .then((resp) => {
          return resp.json();
        })
        .then((data) => {
          $("#movie-review").empty();
          var reviewtitle;
          var shortDescription;
          var criticsName;
          var reviewDate;
          var updatedDate;
          var UrlforReview;
          var content;
          var articles;
          articles = data.results;
          //console.log(articles);
          for (var i = 0; i < articles.length; i++) {
            // reviewtitle=articles[i].headline.main;
            // shortDescription=articles[i].abstract;
            UrlforReview = articles[i].url;
            criticsName = articles[i].author;
            updatedDate = dayjs(articles[i].updated_at).format("DD-MMM-YYYY");
            reviewDate = dayjs(articles[i].created_at).format("DD-MMM-YYYY");
            content = articles[i].content.slice(0, 80) + "...";
            var reviewDiv = $("<div>");
            var authorHeading = $("<h4>");
            var reviewDateHeading = $("<h5>");
            var urltext = $("<a>").attr("href", UrlforReview);
            var contenttag = $("<p>");
            authorHeading.text(criticsName);
            reviewDateHeading.text(reviewDate);

            urltext.text("Read More");
            contenttag.text(content);
            reviewDiv.append(authorHeading);
            reviewDiv.append(reviewDateHeading);
            reviewDiv.append(content);
            reviewDiv.append("<br>");
            reviewDiv.append(urltext);
            reviewDiv.append("<hr>");
            $("#movie-review").append(reviewDiv);
            // console.log(
            // 	"Movie review date: " + reviewDate + " updated: " + updatedDate
            // );
            // console.log("Author: " + criticsName);
            // console.log("weburl: " + UrlforReview);
            // console.log(content);
            // console.log(reviewDiv);
          }
        });
    });
}

$("#movies").on("click", "#movies-thumb-cards", function () {
  if (
    movieSortOptions.val() === "1" ||
    movieSortOptions.val() === "2" ||
    movieSortOptions.val() === "4"
  ) {
    getMovie($(this).find("#sort-card-title").text().trim());
  }
});
