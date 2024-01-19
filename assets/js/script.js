// Initial References
let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");

// Add your YouTube Data API key here
const youtubeKey = 'AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw';

// Function to fetch YouTube videos related to the movie
let getYoutubeVideos = (movieName) => {
    let url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${movieName} trailer&key=${youtubeKey}`;
  
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If videos exist
        if (data.items.length > 0) {
          let videosHtml = '<h3>Trailer:</h3>';
  
          videosHtml += `
            <iframe width="540" height="315" src="https://www.youtube.com/embed/${data.items[0].id.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          `;
  
          result.innerHTML += videosHtml;
        }
      })
      .catch(() => {
        result.innerHTML += '<h3 class="msg">Error Occurred While Fetching YouTube Videos</h3>';
      });
  };

// Function to fetch data from API
const key = '2bd71b72';
let getMovie = () => {
  let movieName = movieNameRef.value;
  let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;
  // If input field is empty
  if (movieName.length <= 0) {
    result.innerHTML = `<h3 class="msg">Please Enter A Movie Name</h3>`;
  }
  // If input field is NOT empty
  else {
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // If movie exists in database
        if (data.Response == "True") {
          result.innerHTML = `
            <div class="info">
                <img src=${data.Poster} class="poster">
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

          // Fetch YouTube videos related to the movie
          getYoutubeVideos(movieName);
        }
        // If movie does NOT exists in database
        else {
          result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
        }
      })
      // If error occurs
      .catch(() => {
        result.innerHTML = `<h3 class="msg">Error Occurred</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getMovie);
window.addEventListener("load", getMovie);