require("dotenv").config();

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

var command = process.argv[2];
var searchValue = process.argv[3];
// var defautSong = 'The Sign';

var i, j;
var concerts;

var concertThis = function(artist){
    axios.get('https://rest.bandsintown.com/artists/' + artist + '/events?app_id=codingbootcamp').then(
        function(response){
            // console.log(response.data);

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

var spotifyThis = function(song){

    if(song == null){   
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

var movieThis = function(movie){
    var movie = encodeURI(movie);
    axios.get('https://www.omdbapi.com/?t=' + movie + '&y=&plot=short&apikey=trilogy').then(
        function(response){
            
            var ratings = response.data.Ratings;
            for (i in ratings){
                // console.log(ratings[i].Source);
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
