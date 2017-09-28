var fs = require ("fs");
var twitter = require ("twitter");
var spotify = require ("node-spotify-api");
var request = require ("request");
var keys = require('./keys.js');
var argVar1 = process.argv[2];
var argVar2 = process.argv[3];


function initializer(){
    switch(argVar1){

    case "my_tweets":
    myTweets();
    break;
    
    case "spotify_this_song":
    spotify_song();
    break;

    case "movie_this":
    check_movie();
    break;
    
    default:
    console.log("Please enter a command (i.e. my_tweets | spotify_this_song | movie_this");

    }

};

function myTweets(){
    var client = new twitter(keys.twitterKeys);
    var params = { screen_name: 'dbai22', count: 20 };
    client.get('statuses/user_timeline', params, function(error, tweets, response){
        if(error){
        return console.log("Error");

         } else {
            for(var i = 0; i < tweets.length; i++){
            console.log(i+1);
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
            }
        }
    });
};


function check_movie(){
    if(argVar2 === undefined){
       argVar2 = "Mr.Nobody";
   }
   queryUrl = "http://www.omdbapi.com/?t=" + argVar2 + "&y=&plot=short&apikey=40e9cece";
   
    
    request(queryUrl, function(error, response, body){
    if (!error && response.statusCode == 200) {
        let json = JSON.parse(body);
        console.log("Title: "+ json.Title);
        console.log("Year: " + json.Year);
        console.log("IMDB Rating: " + json.imdbRating);
        console.log("Country: " + json.Country);
        console.log("Language: " + json.Language);
        console.log("Plot: " + json.Plot);
        console.log("Actors: " + json.Actors);
        console.log("Rotten Tomatoes Rating: " + json.tomatoRating);
        console.log("Rotten Tomatoes URL: " + json.tomatoURL);
      } else {
          console.log("Oops! try again!");
      }
    });
   };

function spotify_song(){
    spotify = new spotify(keys.spotifyKeys);
    if(argVar2 === undefined){
        argVar2 = "I Want It That Way";
    }
    
    spotify.search({ type: 'track', query: argVar2, count: 20 }, function(error, data){
        if(error){
           return console.log("error");
      } else  {
          var trackInfo = data.tracks.items;
           console.log(trackInfo);
            
           for (i = 0; i < trackInfo.length; i++){
                console.log(i + 1)
                console.log("Track: " + trackInfo[i].name);
                console.log("Artist: " + trackInfo[i].artists[0].name);
                console.log("Album: " + trackInfo[i].album.name);
                console.log("Link: " + trackInfo[i].href);
                console.log("\n ------------------");       
                }
           }
        
      });
    };

initializer();

