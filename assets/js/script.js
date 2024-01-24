var searchInput = $("#search-input");
var searchBtn = $("#search-btn");
var movieSortTitle = $("#movie-sort-title");
var movieSortOptions = $("#movie-sort-options");
var movieCards = $("#movies");
var movieInfo = $("#movie-info");
var clearFavoriteHistory = $("#clear-button");
var currentDay = dayjs().format("YYYY-MM-DD");
/* -----------------------
        Functions
   ----------------------- */

// Fetch movies from TMDB by serch criteria
// Function to create movie cards
function createMovieCards(data) {
  movieCards.empty();

  for (var i = 0; i < 8; i++) {
    var posterPath = data.results[i].poster_path;
    var imgSrc = posterPath
      ? `https://image.tmdb.org/t/p/w200/${posterPath}`
      : "../img/No_image.png";
    var card =
      $(`<div class="col card-group" id="movies-thumb-cards" style="border: 1px, solid; border-radius: 10px;">
      <div class="movie-wraper card row-cols-1 " style="max-width:100%;">
      <div class="row d-flex align-items-center g-0">
      <div class="col-3 col-sm-2 col-md-4 h-auto ">
            <img src="${imgSrc}" class="img-fluid p-2" alt="Movie poster" />
          </div>
          <div class="col-8">
            <div class="card-body">
              <h5 id="sort-card-title" data-title="${
                i + 1
              }" class="card-title">${data.results[i].title}</h5>
              <p id="rating" class="card-text fw-bold"><i class="fa-solid fa-star"></i>${
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
  if (movieSortOptions.val() === "4") {
    fetchFavoriteMovies();
    movieSortTitle.text("Favorites");
  }
}
var fetchFavoriteMovies = function () {
  movieCards.empty();
  var apiKey = "bdc89408c9f3fc4ec6ef3b8781672df0";
  var moviesFromLS = localStorage.getItem("FavoriteMovies");
  if (moviesFromLS) {
    var favoriteMovies = JSON.parse(moviesFromLS);
    for (var i = 0; i < favoriteMovies.length; i++) {
      var querUrl = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${favoriteMovies[
        i
      ]
        .split(" ")
        .join("+")}`;
      displayFavoriteMovies(querUrl, i);
    }
  } else {
    var noFavorites = $("<h5>No favorite movies yet</h5>");
    movieCards.append(noFavorites);
  }
};

var displayFavoriteMovies = function (url, index) {
  fetch(url)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      var posterPath = data.results[0].poster_path;
      var imgSrc = posterPath
        ? `https://image.tmdb.org/t/p/w200/${posterPath}`
        : "/assets/img/No_image.png";
      var card =
        $(`<div class="col" id="movies-thumb-cards-${index}" style="border: 1px, solid; border-radius: 10px;">
              <div class="movie-wraper position-relative card row-cols-1" style="max-width:fit-content;">
              <div id="remove-favorite"><i class="fa-solid fa-xmark"></i></div>
              <div class="row d-flex align-items-center g-0">
              <div class="col-md-4 h-auto col-sm-4">
                    <img src="${imgSrc}" class="img-fluid p-2" alt="Movie poster" />
                  </div>
                  <div class="col-md-8 col-sm-8">
                    <div class="card-body">
                      
                      <h5 id="sort-card-title" class="card-title">${
                        data.results[0].title
                      }</h5>
                      <p id="rating" class="card-text"><i class="fa-solid fa-star"></i>${data.results[0].vote_average.toFixed(
                        1
                      )}</p>
                      <p class="card-text">
                        <small class="text-muted">${
                          data.results[0].release_date
                        }</small>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>`);

      movieCards.append(card);

      $(`#movies-thumb-cards-${index}`).on(
        "click",
        "#remove-favorite",
        function () {
          // Find the title associated with the clicked card
          var titleToRemove = $(this)
            .closest(".card")
            .find("#sort-card-title")
            .text();
          // Find the index of the title in the favoriteMovies array
          var moviesFromLS = localStorage.getItem("FavoriteMovies");
          var favoriteMovies = JSON.parse(moviesFromLS);
          var elementIndex = favoriteMovies.indexOf(titleToRemove);
          // Remove the element if found
          if (elementIndex !== -1) {
            favoriteMovies.splice(elementIndex, 1);

            // Update local storage with the modified array
            localStorage.setItem(
              "FavoriteMovies",
              JSON.stringify(favoriteMovies)
            );
            $("#movie-details").empty();
            $("#movie-review").empty();
            fetchFavoriteMovies();
          }
        }
      );
    });
};

fetchMovies();
// On Search button click fetch data about movies from OMDB
searchBtn.on("click", function () {
  $("#movie-details").empty();
  $("#movie-review").empty();
  if (searchInput.val() !== "") {
    getMovie(searchInput.val());
    $("html, body").animate(
      {
        scrollTop: $("#movie-details").offset().top,
      },
      300
    );
  }
});

movieSortOptions.on("change", function () {
  fetchMovies();
  $(clearFavoriteHistory).addClass("d-none");
  $("#movie-details").empty();
  $("#movie-review").empty();
  // Changed cursor to not-allowed when Future realeases selected to avoid missing data errors
  setTimeout(function () {
    if (movieSortOptions.val() === "3") {
      $("#movies-thumb-cards .card").css("cursor", "not-allowed");
    }
  }, 500);

  if (
    movieSortOptions.val() === "4" &&
    localStorage.getItem("FavoriteMovies").length > 0
  ) {
    $(clearFavoriteHistory).removeClass("d-none");
  }
  if (
    movieSortOptions.val() === "4" &&
    localStorage.getItem("FavoriteMovies").length === 2
  ) {
    $(clearFavoriteHistory).addClass("d-none");
  }
});

/* ---------------
Tomaz code
---------------- */

// Initial References
let movieNameRef = document.getElementById("search-input");
let searchButton = document.getElementById("search-btn");
let result = document.getElementById("movie-details");

// Add your YouTube Data API key here
const youtubeKey = "AIzaSyAULANoAdeRi1HNZ4FPiPdleKb6LQzo8Z4";

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
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      // If movie exists in database
      if (data.Response == "True") {
        result.innerHTML = `
            <div class="info container-xxl py-5">
              <div class="row">
                <div class="col-12 position-relative">
                  <h2 class="text-md-start d-flex">${data.Title}</h2>
                  <button id="favorites-btn" class="d-flex flex-column" title="Add To Favorites"><i class="fa-regular fa-star"></i></button>
                  <div class="meta mb-3">
                      <span class="text-start">${data.Year} &bull;</span>
                      <span class="text-start"> ${data.Rated} &bull;</span>
                      <span class="text-start"> ${data.Runtime} &bull;</span>   
                      <span class="text-start"> <i class="fa-solid fa-star" aria-hidden="true"></i>${
                        data.imdbRating
                      }</span>
                  </div>
                </div>
               </div>   
                <div class="row">
                  <div class="col-12 d-flex flex-column flex-sm-row position-relative">
                  <img src=${data.Poster} class="img-fluid poster">
                  <div id="youtube-trailer">
                  </div>
                </div>                   
                    
              <div class="row">
              <div class="col-12 d-flex my-3">
                        <div class="genre">${data.Genre.split(",").join(
                          "</div><div class='genre'>"
                        )}</div>
              </div>
                        
              </div>
            </div>
            <div class="row">
            <div class="col-12 about-movie">           
            <p>${data.Plot}</p>
            <p><span>Director(s): </span>${data.Director}</p>
            <p><span>Writer(s): </span>${data.Writer}</p>
            <p><span>Actors: </span>${data.Actors}</p>
            </div>
            </div>
            
          `;

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

      $("#movie-details")
        .off("click", "#favorites-btn")
        .on("click", "#favorites-btn", function () {
          $("#favorites-btn i").css("color", "#ffb92a");
          $("#favorites-btn i").attr("title", "Already In Favorites");
          var title = data.Title.trim();
          var favorites =
            JSON.parse(localStorage.getItem("FavoriteMovies")) || [];
          if (favorites.length < 8) {
            favorites.push(title);
            var favoriteMovies = [...new Set(favorites)];
            localStorage.setItem(
              "FavoriteMovies",
              JSON.stringify(favoriteMovies)
            );
          }
        });

      var moviesFromLS = localStorage.getItem("FavoriteMovies");
      if (moviesFromLS) {
        if (moviesFromLS.includes(data.Title.trim())) {
          $("#favorites-btn i").css("color", "#ffb92a");
          $("#favorites-btn i").attr("title", "Already In Favorites");
        }
      }
    });
};

var querUrl =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=rambo&fq=section_name:Movies&type_of_material:Review&sort=newest&page=0&api-key=v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb";

function movieReviews(movietitle) {
  var querUrl =
    "https://api.themoviedb.org/3/search/movie?query=" +
    movietitle +
    "&api_key=c9496f893f42d58d46a50e1820b050e8";
  //'https://api.themoviedb.org/3/movie/1771?api_key=c9496f893f42d58d46a50e1820b050e8'

  fetch(querUrl)
    .then((resp) => {
      return resp.json();
    })
    .then((data) => {
      var movieId = data.results[0].id;
      var allReviewsUrl =
        "https://www.themoviedb.org/movie/" +
        movieId +
        "-" +
        movietitle.split("+").join("-") +
        "/reviews";
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
          var totalReviewsCount = data.results.length;
          var criticsName;
          var reviewDate;
          var UrlforReview;
          var content;
          var articles;
          articles = data.results;
          var seeAllReviews = $(
            `<div class="total-reviews-wraper mb-4 pt-2"><a class="all-reviews btn btn-danger position-relative text-uppercase" target="_blank" href="${allReviewsUrl}">See all reviews</a><span class=" review-count fs-6"> (${totalReviewsCount})</span></div>`
          );
          $("#movie-review").prepend(seeAllReviews);
          var cardsWraper = $(`<div class="cards-wraper pb-5">`);
          $("#movie-review").append(cardsWraper);
          for (var i = 0; i < 3; i++) {
            var authorRating = articles[i].author_details.rating;
            if (articles[i].author_details.rating == null) {
              authorRating = 0;
            } else {
              authorRating = articles[i].author_details.rating;
            }

            UrlforReview = articles[i].url;
            criticsName = articles[i].author;
            reviewDate = dayjs(articles[i].created_at).format("DD-MMM-YYYY");
            content = articles[i].content;

            var reviewDiv = $("<div>");
            reviewDiv.addClass("card");
            var rating = $("<i>");
            rating.addClass("fa-solid fa-star");
            var authorHeading = $("<h4>");
            var ratingText = $(`<span>${authorRating} -</span>`);
            var reviewDateHeading = $("<h5>");
            var urltext = $("<a>").attr("href", UrlforReview);
            var contenttag = $("<p>");
            var ratediv = $("<div>");
            ratediv.append(rating);
            rating.append(ratingText);
            authorHeading.text(criticsName);
            reviewDateHeading.text(reviewDate);
            contenttag.text(content);
            // reviewDiv.append(rating);
            authorHeading.prepend(rating);
            reviewDiv.append(authorHeading);
            reviewDiv.append(reviewDateHeading);
            reviewDiv.append(content);
            reviewDiv.append("<br>");
            reviewDiv.append(urltext);
            cardsWraper.append(reviewDiv);
          }
        });
    });
}

$("#movies").on("click", ".movie-wraper", function () {
  if (
    movieSortOptions.val() === "1" ||
    movieSortOptions.val() === "2" ||
    movieSortOptions.val() === "4"
  ) {
    $("html, body").animate(
      {
        scrollTop: $("#movie-details").offset().top,
      },
      300
    );
    getMovie($(this).find("#sort-card-title").text().trim());
  }
});

$("#clear-full-history").on("click", function () {
  localStorage.clear();
  clearFavoriteHistory.addClass("d-none");
  $("#movie-details").empty();
  $("#movie-review").empty();
  fetchFavoriteMovies();
});
