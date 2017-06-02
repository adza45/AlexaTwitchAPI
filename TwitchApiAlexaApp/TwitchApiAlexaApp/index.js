/*'use strict'
var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), {multiArgs: true});
exports.handler = (event, context, callback) => {

var urlList =[];
var streamers = ["A_Seagull", "Lirik", "summit1g", "sodapoppin", "TSM_Bjergsen", "NALCS1", "C9Sneaky", "MOONMOON_OW", "mendokusaii", "Meteos"];
for(var i =0; i< 10; i++){
  urlList.push("https://api.twitch.tv/kraken/streams/"+streamers[i]+"?client_id=dupvdxyso3tod5js96yf7tq92u3075")
}

  Promise.map(urlList, function(url) {
      return request.getAsync(url).spread(function(response,body) {
          return [JSON.parse(body),url];
      });
  }).then(function(results) {
        //callback(null, "Test");
        var speechOutput = ""
        for(var i =0; i< 10; i++){
            if(results[i][0].stream != null) {
                speechOutput += results[i][0].stream.channel.name + " is streaming, ";
            }
        }
        callback(null, speechOutput);
  }).catch(function(err) {

  });
};
*/
'use strict'
var Alexa = require("alexa-sdk");

var Promise = require("bluebird");
var request = Promise.promisifyAll(require("request"), {multiArgs: true});
//-----------------------------------INITIALIZE SKILL-----------------------------------//
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
};

var handlers = {
    "LaunchRequest": function () {
        this.emit(":ask", "Welcome to the twich api!");
    },
    "getCurrentStreamers": function () {
      var that = this;
      var urlList =[];
      var streamers = ["A_Seagull", "Lirik", "summit1g", "sodapoppin", "TSM_Bjergsen", "NALCS1", "C9Sneaky", "MOONMOON_OW", "mendokusaii", "Meteos"];
      for(var i =0; i< 10; i++){
        urlList.push("https://api.twitch.tv/kraken/streams/"+streamers[i]+"?client_id=dupvdxyso3tod5js96yf7tq92u3075");
      }

        Promise.map(urlList, function(url) {
            return request.getAsync(url).spread(function(response,body) {
                return [JSON.parse(body),url];
            });
        }).then(function(results) {
              //callback(null, "Test");
              var speechOutput = "";
              console.log(results);
              for(var i =0; i< 10; i++){
                  if(results[i][0].stream != null) {
                      speechOutput += results[i][0].stream.channel.name + " is streaming, ";
                  }
              }

              that.emit(":tell", speechOutput);
        }).catch(function(err) {

        });
      }
    }



//-----------------------------------SETUP HANDLERS-----------------------------------//
exports.handler = function (event, context, callback) {
    var alexa = Alexa.handler(event, context);
    //alexa.dynamoDBTableName = "RememberData";
    alexa.registerHandlers(handlers);
    alexa.execute();
};
