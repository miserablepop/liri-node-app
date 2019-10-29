require("dotenv").config();

// Importing Spotify keys
var keys = require('./keys.js');

// Access Spotify keys
var spotify = new Spotify(keys.spotify);

// Include the axios npm package
var axios = require('axios');

var command = process.argv[2];
var searchValue = process.argv[3];

var concertThis = function(artist){
    axios.get('https://rest.bandsintown.com/artists/' + artist + 'events?').then(
        function(response){
            console.log(response);
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
