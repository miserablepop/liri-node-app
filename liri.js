require("dotenv").config();

// VARIABLES
//////////////////////////////////////////////////////////////

// Importing Spotify keys
var keys = require('./keys.js');

// Including the node-spotify-api
var Spotify = require('node-spotify-api');

// // Access Spotify keys
var spotify = new Spotify(keys.spotify);

// Include the axios npm package
var axios = require('axios');

// Include the moment npm package
var moment = require('moment');

// Varibales for command line arugments
var command = process.argv[2];
var searchValue = process.argv[3];

// Loop variables
var i, j;



//FUNCTIONS
///////////////////////////////////////////////////////////////////////


// Concert-this function
var concertThis = function(artist){

    // Axios to call for BandsInTown response
    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp').then(
        function(response){
            // console.log(response.data);

            // For loop to iterate through response

            for(i in response.data){
                var concertDate = response.data[i].datetime;
                var venue = response.data[i].venue;
                console.log('--------------------------');
                console.log('Venue name: ' + venue.name);
                console.log('Venue location: ' + venue.city + ', ' + venue.region + ' ' + venue.country);
                console.log('Concert date: ' + moment(concertDate).format('MMMM Do YYYY'));
            }

        }).catch(function(error){
            if (error.response){
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
    });
}


// Spotify-this-song function
var spotifyThis = function(song){

    // If statement to see if user passes song name
    if(song == null){   

        // If no song then search for the Sign as default
        spotify.search({ type: 'track', query: 'The Sign'}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
          
            for(i in data.tracks.items){
                var songName = data.tracks.items[i].name;
                var songLink = data.tracks.items[i].preview_url;
                var album = data.tracks.items[i].album;
                for(j in data.tracks.items[i].artists){
                  var artistName = data.tracks.items[i].artists[j].name;
                }
              
                if (artistName === 'Ace of Base'){
                    console.log('---------------------------');
                    console.log('Artist: ' + artistName);
                    console.log('Song Name: ' + songName);
                    console.log('Preview Song link: ' + songLink);
                    console.log('Album Name: ' + album.name);
                }
            }
        });

    } else {

        // Search for song user enters
        spotify.search({ type: 'track', query: song,}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
            console.log(song)
            for(i in data.tracks.items){
                var songName = data.tracks.items[i].name;
                var songLink = data.tracks.items[i].preview_url;
                var album = data.tracks.items[i].album;
                for(j in data.tracks.items[i].artists){
                  var artistName = data.tracks.items[i].artists[j].name;
                }
                         
         
              console.log('---------------------------');
              console.log('Artist: ' + artistName);
              console.log('Song Name: ' + songName);
              console.log('Preview Song link: ' + songLink);
              console.log('Album Name: ' + album.name);
      
            }
          });
    }

}

// Movie-this function
var movieThis = function(movie){

    //URLEncode the string
    var movie = encodeURI(movie);

    // Axios to call the OMDB API 
    axios.get('https://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy').then(
        function(response){
            
            // Variable for ratings array 
            var ratings = response.data.Ratings;

            // For loop to extract the Rotten Tomatoes score
            for (i in ratings){
                
                if(ratings[i].Source === 'Rotten Tomatoes'){
                    var rotten = ratings[i]['Value'];
                }
            }
            
            console.log('---------------------------');
            console.log('Title: ' + response.data.Title);
            console.log('Year: ' + response.data.Year);
            console.log('IMDB Rating: ' + response.data.imdbRating);
            console.log('Rotten Tomatoes Score: ' + rotten);
            console.log('Country: ' + response.data.Country);
            console.log('Language: ' + response.data.Language);
            console.log('Movie Plot: ' + response.data.Plot);
            console.log('Actors: ' + response.data.Actors);

        }).catch(function(error){
            if (error.response){
                console.log("---------------Data---------------");
                console.log(error.response.data);
                console.log("---------------Status---------------");
                console.log(error.response.status);
                console.log("---------------Status---------------");
                console.log(error.response.headers);
            } else if (error.request) {
                console.log(error.request);
            } else {
                console.log('Error', error.message);
            }
            console.log(error.config);
    });
}


switch (command){
    case 'concert-this':
        concertThis(searchValue);
        break;
    case 'spotify-this-song':
        spotifyThis(searchValue);
        break;
    case 'movie-this':
        movieThis(searchValue);
        break;
}
