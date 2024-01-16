/* OMDB Url: https://www.omdbapi.com/ 
query url: http://www.omdbapi.com/?apikey=[yourkey]&
OMDB API - d3150aaf

New York times url: https://developer.nytimes.com/
Query to look for movie reviews:
section_name:"Movies" AND type_of_material:"Review"

https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name%3A"Movies" AND type_of_material%3A"Review"&sort=newest&page=0&api-key{your-key}

API - v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb
*/

var querUrl =
  "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=The%20Matrix&fq=section_name:Movies&type_of_material:Review&sort=newest&page=0&api-key=v7NMMpYkjMpqpGFtYZymGBQiWFEMTMEb";

fetch(querUrl)
  .then((resp) => {
    return resp.json();
  })
  .then((data) => {
    console.log(data);
  });
