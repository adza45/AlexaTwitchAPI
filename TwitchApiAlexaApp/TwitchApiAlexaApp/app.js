var AlexaLambdaHandler = require('./lib/alexa');

module.exports.handler = AlexaLambdaHandler.LambdaHandler;
module.exports.CreateStateHandler = AlexaLambdaHandler.CreateStateHandler;
module.exports.StateString = AlexaLambdaHandler.StateString;

var Alexa = require("alexa-sdk");
var request = require("request");
var rp = require("request-promise");
//-----------------------------------INITIALIZE SKILL-----------------------------------//
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
};

var handlers = {
    "LaunchRequest": function () {
        this.emit(":ask", "Welcome to the twich api!");
    },
    "getCurrentStreamers": function () {
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
                        this.emit(":tell", streamerString);
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
                        this.emit(":tell", streamerString);
                    }
                    counter += 1;
                }
            });

        }
    }
};


//-----------------------------------SETUP HANDLERS-----------------------------------//
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    //alexa.dynamoDBTableName = "RememberData";
    alexa.registerHandlers(handlers);
    alexa.execute();
};
