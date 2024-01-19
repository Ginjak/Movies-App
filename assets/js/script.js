/* OMDB Url: https://www.omdbapi.com/ 
query url: http://www.omdbapi.com/?apikey=[yourkey]&
OMDB query var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";
OMDB API - d3150aaf

Youtube API - AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw
Youtube link to show video, need to add id of a video https://www.youtube.com/watch?v=
var querUrl =
  "https://www.googleapis.com/youtube/v3/search?part=snippet&q=Matrixtrailer&type=video&key=AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw";

//Video ID console.log(data.items[0].id.videoId);

var apiUrl = 'http://www.omdbapi.com/?apikey=15c4e76b&';

fetch(apiUrl)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();  // Parse JSON response
  })
  .then(data => {
    console.log('Fetched data:', data);
    // Use the fetched data here
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

// New York times url: https://developer.nytimes.com/
// Query to look for movie reviews:
// section_name:"Movies" AND type_of_material:"Review"
// https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A"Movies" AND type_of_material%3A"Review"&sort=newest&page=0&api-key{your-key}
// var querUrl =
// "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=The%20Matrix&fq=section_name:Movies&type_of_material:Review&sort=newest&page=0&api-key=v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb";


// API - v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb
*/

// var querUrl =
//   "https://www.googleapis.com/youtube/v3/search?part=snippet&q=TheMatrixtrailer&type=video&key=AIzaSyAh-n-mfDEgD7pppdEFT1Mc8gflKClHvjw";

// OMDB query var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";
// var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";


// displayMovie function display the appropiate content
function displayMovie () {
  
var movie = $(this).attr("data-name");
var apiUrl = 'http://www.omdbapi.com/?t=' + movie + "&apikey=15c4e76b&";

fetch(apiUrl)
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    // creating the div for the movie
    var movieDiv = $("<div class = 'movie'>");

    // storing the name data
    var movieTitle = data.Title;
    //creating the element to display the Title
    var pOne = $("<p>").text("Title: " + movieTitle);
    // displaying the title
    movieDiv.append(pOne);

    // storing the rating data
    var rating = data.Rated;
    // creating the element to display rating
    var pTwo = $("<p>").text("Rating: " + rating);
    // displaying the rating
    movieDiv.append(pTwo);

    // storing the release year
    var released = data.Released;
    // create an element to hold the release year
    var pThree = $("<p>").text("Released: " + released);
    // display the release year
    movieDiv.append(pThree);
    
    // retreiving the plot
    var plot = data.Plot;
    // creating the element for holding the plot
    var pFour = $("<p>").text("Plot: " + plot);
    // appending the plot
    movieDiv.append(pFour);

    // retrieving the url for image
    var imgURL = data.Poster;
    // making the element to hold the poster
    var image =$("<img>").attr("src", imgURL);
    // retrieving the image
    movieDiv.append(image);

    // putting the movie on top
    $("#movies-view").prepend(movieDiv);

    // Title - console.log(data.Title);
    // Release yearconsole.log(data.Year);
    // Runtime in minutes console.log(data.Runtime);
    // Age rating console.log(data.Rated);
    // ImdbRating console.log(data.imdbRating);
    // Movie genreconsole.log(data.Genre);
    // Movie plot console.log(data.Plot);
    //Boxoffice new console.log(data.BoxOffice)
    // Movie directors console.log(data.Director);
    // Movie Actors console.log(data.Actors);
    // Writers console.log(data.Writer);
    // Poster image url console.log(data.Poster);
  });

}

// function for displaying the movie data
function renderButtons() {
  // deleting the previous movies prior adding a new one
  $("#bbutton-addon2").empty();
  // this handles events when button search is clicked
  $("#search-movie").on("click", function(event) {
    event.preventDefault();
    // grab the input from search box
    var movie = $("#movie-input").val().trim();
    // start searching for movie
    $(document).on("click", ".movie", displayMovie);
    // calling render for initial button
    renderButtons();
  })
}