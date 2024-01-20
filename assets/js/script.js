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