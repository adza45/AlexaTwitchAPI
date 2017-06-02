var request = require('request');
var rp = require('request-promise');
var async = require('async');

var clientId = "dupvdxyso3tod5js96yf7tq92u3075";
var streamers = ["A_Seagull", "Lirik", "summit1g", "sodapoppin", "TSM_Bjergsen", "NALCS1", "C9Sneaky", "MOONMOON_OW", "mendokusaii", "Meteos"];
var totalStreamers = streamers.length;
var forLoopTotal = (totalStreamers - 1);
var activeStreamers = [];
var inactiveStreamers = [];
var streamerString = "";
let counter = 0;




for (let i = 0; i < totalStreamers; i++) {
    var url = 'https://api.twitch.tv/kraken/streams/' + streamers[i] + '?client_id=' + clientId;
    rp(url, function (error, response, body) {
        var json = JSON.parse(body);
        if (json.stream == null) {
            inactiveStreamers.push(streamers[i]);
            if (counter == forLoopTotal) {
                console.log(streamerString);
            }
            counter += 1;
        }
        else {
            streamerString += json.stream.channel.name + " is streaming " + json.stream.game + ". ";
            activeStreamers.push({
                key: json.stream.channel.name,
                value: json.stream.game
            });
            if (counter == forLoopTotal) {
                console.log(streamerString);
            }
            counter += 1;
        }
    });
    
}


//async.parallel(function (err, result) {
//    console.log("Should follow this: " + streamerString);
//});



//this.emit(":tell", streamerString);
