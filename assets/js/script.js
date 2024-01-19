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
var querUrl = "http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";
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
    // Movie genreconsole.log(data.Genre);
    // Movie plot console.log(data.Plot);
    //Boxoffice new console.log(data.BoxOffice)
    // Movie directors console.log(data.Director);
    // Movie Actors console.log(data.Actors);
    // Writers console.log(data.Writer);
    // Poster image url console.log(data.Poster);

    console.log(data);
  });
