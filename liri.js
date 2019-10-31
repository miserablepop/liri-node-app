require("dotenv").config();

// Importing Spotify keys
var keys = require('./keys.js');

// // Access Spotify keys
// var spotify = new Spotify(keys.spotify);

// Include the axios npm package
var axios = require('axios');

// Include the moment npm package
var moment = require('moment');

var command = process.argv[2];
var searchValue = process.argv[3];

var i, j, x;
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



switch (command){
    case 'concert-this':
        concertThis(searchValue);
        break;
}
