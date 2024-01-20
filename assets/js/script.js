
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
var querUrl =
	"https://api.nytimes.com/svc/search/v2/articlesearch.json?q=rambo&fq=section_name:Movies&type_of_material:Review&sort=newest&page=0&api-key=v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb";
//"http://www.omdbapi.com/?apikey=d3150aaf&t=The+matrix";
// fetch(querUrl)
//   .then((resp) => {
//     return resp.json();
//   })
//   .then((data) => {
//     // Title - console.log(data.Title);
//     // Release yearconsole.log(data.Year);
//     // Runtime in minutes console.log(data.Runtime);
//     // Age rating console.log(data.Rated);
//     // ImdbRating console.log(data.imdbRating);
//     // Movie genreconsole.log(data.Genre);
//     // Movie plot console.log(data.Plot);
//     //Boxoffice new console.log(data.BoxOffice)
//     // Movie directors console.log(data.Director);
//     // Movie Actors console.log(data.Actors);
//     // Writers console.log(data.Writer);
//     // Poster image url console.log(data.Poster);

//     console.log(data);
//   });

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
						content = articles[i].content;
						var reviewDiv = $("<div>");
						var authorHeading = $("<h4>");
						var reviewDateHeading = $("<h5>");
						var urltext = $("<a>").attr("href", UrlforReview);
						var contenttag = $("<p>");
						authorHeading.text("By: "+criticsName);
						reviewDateHeading.text("on "+reviewDate + " updated: " + updatedDate);
						urltext.text(UrlforReview);

						contenttag.text(content);
						reviewDiv.append(authorHeading);
						reviewDiv.append(reviewDateHeading);
						reviewDiv.append(urltext);
						reviewDiv.append("<br>");
						reviewDiv.append(content);
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
var movie = "matrix resurrection".split(" ").join("+");

//console.log(movie);
movieReviews(movie);

