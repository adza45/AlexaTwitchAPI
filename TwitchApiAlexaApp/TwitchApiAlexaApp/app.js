var request = require('request');

var clientId = "dupvdxyso3tod5js96yf7tq92u3075";
var streamers = ["A_Seagull", "Lirik", "summit1g", "sodapoppin", "TSM_Bjergsen", "NALCS1", "C9Sneaky", "MOONMOON_OW", "mendokusaii", "Meteos"];
var totalStreamers = streamers.length;

var activeStreamers = [];
var inactiveStreamers = [];
main();

function main() {
    activeStreamers = [];
    inactiveStreamers = [];
    for (i = 0; i < totalStreamers; i++) {
        var url = 'https://api.twitch.tv/kraken/streams/' + streamers[i] + '?client_id=' + clientId;
        getStatus(url, streamers[i], i);
    }
    DisplayActiveStreamers();
}

function getStatus(url, streamer, i) {
    request(url, function (error, response, body) {
        var json = JSON.parse(body);
        if (json.stream == null) {
            inactiveStreamers.push(streamer);
        }
        else {
            console.log(streamer + " is streaming " + json.stream.game);
            activeStreamers.push({
                key: streamer,
                value: json.stream.game
            });
        }
    });
}

function DisplayActiveStreamers() {
    for (i = 0; i < activeStreamers.length; i++) {
        console.log(activeStreamers[i].key + ' on pin ');
    }
}

function DisplayInactiveStreamers() {
    for (i = 0; i < inactiveStreamers.length; i++) {
        console.log(inactiveStreamers[i]);
    }
}